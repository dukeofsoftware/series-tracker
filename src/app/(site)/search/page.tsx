"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { useIntersection } from '@mantine/hooks'
import { useSearchParams } from "next/navigation"
import axios from "axios"
import SeriesCard, { SuspenseFallback } from "@/components/series/SeriesCard"



const Page = ({ }) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const params = useSearchParams()
  const q = params.get('q')
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })

  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query = `https://www.episodate.com/api/search?q=${q}&page=${pageParam}`



      const { data } = await axios.get(query)
      return data
    },
    {
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
    if (entry?.isIntersecting) {
      fetchNextPage() // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage])
  return (<main className="container  mt-6 md:mt-12 min-h-screen">
    <ul className='flex flex-wrap justify-center gap-6 mt-6'>
     
      {!isLoading && data?.pages[0].pages === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl font-semibold text-center text-slate-900 dark:text-slate-200">
            No results found
          </h1>

        </div>
      )      }
      {!isLoading &&
        data?.pages?.map((page) => {
          return (
            <>
              {page?.tv_shows?.map((show: any, i: number) => {

                if (i === page.tv_shows.length - 1) {
                  return (
                    <li key={show.id} ref={ref}>
                      <SeriesCard data={show} />
                    </li>
                  )
                }
                else {
                  return (
                    <li key={show.id}>
                      <SeriesCard data={show} />
                    </li>
                  )
                }
              }

              )}
            </>
          )

        })}

      {isLoading || isFetching && <SuspenseFallback />}


    </ul>

  </main>)
}

export default Page