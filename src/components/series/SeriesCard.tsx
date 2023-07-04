import { Series } from '@/types/series'
import Image from 'next/image'
import { FC } from 'react'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
import { Badge } from '../ui/badge'

interface SeriesCardProps {
    data: Series
}
const SeriesCard: FC<SeriesCardProps> = ({
    data
}) => {
    return (
        <Link href={`/series/${data.permalink}`} className='  w-full  rounded-t-lg shadow-md   '>
            <div className='bg-slate-100 shadow-md dark:bg-slate-950  pb-4 w-[280px] active:scale-[0.99] hover:scale-[0.99] duration-200 rounded-t-lg'>
                <div className='h-[310px] w-full  relative rounded-t-lg'>
                    <Image src={data.image_thumbnail_path} alt={data.name} fill className='object-fill rounded-t-lg opacity-0 transition duration-300 ease-in-out '
                        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
                    />
                </div>
                <div className='px-4 '>
                    <p className='text-center   font-bold  my-4 '>
                        {data.name}
                    </p>
                    <div className='flex items-center  justify-between'>
                        <Badge variant={"default"}>
                            {data.status}
                        </Badge>
                        <Badge variant={"outline"} className='border-2 border-slate-900 dark:border-slate-100'>
                            {data.network ? data.network : null}
                        </Badge>
                    </div>
                </div>

            </div>

        </Link>
    )
}

export default SeriesCard

export const SuspenseFallback = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        numbers.map((_, index) => {
            return (
                <Skeleton className='w-[280px] h-[390px]  rounded-t-lg shadow-md bg-slate-950' key={index}>
                    <Skeleton className='h-[310px] w-[280px]  relative rounded-t-lg'>

                    </Skeleton>
                    <div className='px-4 '>

                        <div className=" flex justify-center ">
                            <Skeleton className='my-4 h-6 bg-slate-300 font-bold w-16  mt-2 mr-3' />
                            <Skeleton className='my-4 h-6 bg-slate-300 font-bold w-24  mt-2' />
                        </div>


                        <div className='flex items-center  justify-between'>
                            <Skeleton className='w-[55px] h-[21px] rounded-md bg-white border'/>
                           
                            <Skeleton className='w-[50px] h-[21px] rounded-md border'/>
                               
                        </div>
                    </div>
                </Skeleton>
            )
        })


    )
}