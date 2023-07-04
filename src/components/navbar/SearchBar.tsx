'use client'
import { BiLoaderAlt } from 'react-icons/bi'
import { useEffect, useRef, useState } from 'react'
import { useDebounce, useThrottledCallback } from 'use-debounce';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import SearchBarItem from './SearchBarItem';
import { toast } from 'react-toastify';
import { ScrollArea } from '../ui/scroll-area';
import { Series } from '@/types/series';
import { Separator } from "@/components/ui/separator"
import { FaSpinner } from 'react-icons/fa';
import { useInfiniteQuery } from '@tanstack/react-query'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
const SearchBar = ({ }) => {
    const [text, setText] = useState('');
    const [value] = useDebounce(text, 1000);
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const router = useRouter()



    const fetchShows = async ({ pageParam = 1 }) => {
        try {
            if (!value) return
            const response = await axios.get(`https://www.episodate.com/api/search?q=${text}&page=${pageParam}}`)
                .then((res) => {
                    return res.data
                })
            if (response.pages === 0) return
            return response
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error('Something went wrong: ' + error.message)
            }

        }

    }

    const { hasNextPage, fetchNextPage, data, isLoading, refetch, isFetchingNextPage
    } = useInfiniteQuery(["search", text], fetchShows, {
        getNextPageParam: (lastPage, index) => {

            if (lastPage?.page === lastPage?.pages) return null
            return index.length + 1
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    }
    )
    useEffect(() => {
        if (value.length > 0) {
            refetch()
        }


    }, [value, refetch])

    const handleClickOutside = (event: any) => {
        if (scrollAreaRef.current && !scrollAreaRef.current.contains(event.target)) {
            setText('');
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        router.push(`/search?q=${text}`);
        setText("")
    };

    return (<div className='relative w-full max-w-[28rem] flex flex-col z-40'>
        <form onSubmit={handleSubmit} className='flex  px-6 py-3  h-12 rounded-full border-2 border-slate-900 dark:border-slate-200 relative items-center' >
            <input
                className='w-full bg-transparent outline-none text-slate-900 dark:text-slate-200'
                type='text'
                placeholder='Search'
                value={text}
                onChange={(e) => setText(e.target.value)}
                id='search'
            />
            <label htmlFor='search'>
                <BsSearch className='pointer-events-none w-4 h-4 text-slate-900 dark:text-slate-200' />
            </label>
        </form>

        {
            text.length > 0 && (
                <div className="absolute top-12 w-full max-h-72  pt-1 ">

                    <ScrollArea ref={scrollAreaRef} className="h-[23rem] bg-slate-50 dark:bg-slate-900  shadow-md px-3 border-2 border-slate-200/90 py-2 rounded-md">
                        {!isLoading && !data?.pages[0] && (
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <h1 className="text-2xl font-semibold text-center text-slate-900 dark:text-slate-200">
                                    No results found
                                </h1>

                            </div>
                        )}




                        {isLoading ? (
                            <div className="flex items-center justify-center h-12 ">
                                <FaSpinner className="w-4 h-4 animate-spin mr-2 text-slate-100 font-bold" />
                                Loading...</div>
                        ) : (
                            <ul className='flex flex-col '>
                                {data?.pages?.map(page => (
                                    <>
                                        {page?.tv_shows?.map((show: Series) => {

                                            return (
                                                <li className='dark:hover:bg-slate-950  dark:active:bg-slate-950 duration-150 px-2 rounded-lg' key={show.id}>
                                                    <SearchBarItem data={show} />
                                                    <Separator />
                                                </li>
                                            )


                                        })}
                                    </>
                                ))

                                }

                            </ul>
                        )}
                        {isFetchingNextPage
                            ? <li className=' flex items-center justify-center'>
                                <FaSpinner className="mr-4 w-4 h-4 animate-spin " mr-2 />
                                <p className='text-lg font-bold'>Loading...</p>
                            </li>
                            : hasNextPage
                                ? <Button onClick={() => fetchNextPage()} variant={"ghost"} className='w-full'>
                                    Load More
                                </Button>
                                : null
                        }

                    </ScrollArea>
                </div>)

        }
    </div>)
}

export default SearchBar