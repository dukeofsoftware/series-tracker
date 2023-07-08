"use client"

import SeriesCard, { SuspenseFallback } from '@/components/series/SeriesCard'
import { Button, buttonVariants } from '@/components/ui/button'
import { Series, SeriesResponse } from '@/types/series'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FC, useEffect, useMemo } from 'react'
import { BsChevronBarLeft, BsChevronBarRight, BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs'


interface FavoritePageProps {
    cachedData?: SeriesResponse
}
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const FavoritePage: FC<FavoritePageProps> = () => {
    const params = useSearchParams()
    const path = usePathname()
    const router = useRouter()
    const page = useMemo(() => parseInt(params.get('page')!), [params]) || 1
    const { data, isLoading, refetch, isFetching } = useQuery(
        ['pagination-list-feed'],
        async ({ }) => {
            const query = `/api/user/favorites?page=${page}`
            const { data } = await axios.get(query)
            return data
        },
        {

            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    )
    useEffect(() => {
        refetch()
    }, [page, refetch])
    return <main className=' mt-6 md:mt-12  container'>
        <h1 className='font-semibold text-2xl text-center'>Your favorites</h1>
        <div className=''>
            <div className='min-h-screen'>

                <ul className='flex flex-wrap justify-center gap-6 mt-6'>
                    {isLoading || isFetching ? (
                        <SuspenseFallback />
                    ) : (
                        data ? (
                            data?.series?.map((show: Series) => {
                                return (
                                    <li key={show.id}>
                                        <SeriesCard data={show} />
                                    </li>
                                )
                            })) : (<div className='text-sky-500 text-lg mt-12'>
                                <p>No results found...</p>
                                <Link href={"/"} className={cn(buttonVariants({ variant: "link" }))}>
                                    Go to home
                                </Link>
                            </div>

                        ))}




                </ul>

            </div>
            <div className='flex justify-center mt-4 gap-1'>

{data && (
    <>
                    <Button variant="outline" size="icon" onClick={() => router.push(`${path}?page=${page - 1}`)} disabled={data.page === 1}>
                    <BsChevronLeft className='h-4 w-4' />
                    <p className='sr-only'>
                        go previous
                    </p>

                </Button>
                <Button variant="outline" size="icon" disabled={data.page <= 2} onClick={() => router.push(`${path}?page=${page - 2}`)}>
                    <BsChevronDoubleLeft className='h-4 w-4' />
                    <p className='sr-only'>
                        go 2 previous page
                    </p>

                </Button>
                <Button variant="outline" size="icon" disabled={data.page === 1} onClick={() => router.push(`${path}?page=${0}`)}>
                    <BsChevronBarLeft className='h-4 w-4' />
                    <p className='sr-only'>
                        go to start
                    </p>
                </Button>

                <Button variant="outline" size="icon" disabled={
                    data.pages === data.page
                } onClick={() => router.push(`${path}?page=${data.pages}`)}>
                    <BsChevronBarRight className='h-4 w-4' />
                    <p className='sr-only'>
                        go to end
                    </p>
                </Button>
                <Button variant="outline" size="icon" disabled={
                    data.pages <= data.page + 1
                } onClick={() => router.push(`${path}?page=${page + 2}`)}  >
                    <BsChevronDoubleRight className='h-4 w-4' />
                    <p className='sr-only'>
                        go 2 next page
                    </p>


                </Button>
                <Button variant="outline" size="icon" disabled={
                    data.pages === data.page
                }
                    onClick={() => router.push(`${path}?page=${page + 1}`)}
                >
                    <BsChevronRight className='h-4 w-4' />
                    <p className='sr-only'>
                        go next
                    </p>

                </Button></>
)}
            </div>





        </div>

    </main>
}

export default FavoritePage