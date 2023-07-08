'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { SeriesDetailsResponse } from '@/types/series'
import { FC, useTransition } from 'react'
import parse from 'html-react-parser';
import ModalImage from "react-modal-image";

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BsHeartFill, BsPlusCircle } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { BiChevronsLeft, BiLoaderCircle } from 'react-icons/bi'
import { useRouter } from 'next/navigation';
import { CiCircleRemove, CiKeyboard } from 'react-icons/ci'
import { useUpdateFavorites } from '@/hooks/update-favorites';
import { useCreateSeries } from '@/hooks/create-series';
import { toast } from 'react-toastify';
import { useDeleteSeries } from '@/hooks/delete-series';

interface SeriesPageProps {
    series: SeriesDetailsResponse
    userSeries: any
}

const SeriesPage: FC<SeriesPageProps> = ({ series, userSeries }) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const { mutate: createSeries, isLoading: isCreatingSeries } = useCreateSeries()
    const { mutate: mutateFavorite, isLoading: isFavoriteLoading } = useUpdateFavorites()
    const { mutate: deleteSeries, isLoading: isDeletingSeries } = useDeleteSeries()
    const updateStatus = async () => {
        startTransition(async () => {
            await mutateFavorite(series.id.toString())
            router.refresh()

        })
    }
    const addToList = async () => {
        startTransition(async () => {
            try {
                const data = {
                    apiId: series.id.toString(),
                    name: series.name,
                    permalink: series.permalink,
                    network: series.network,
                    status: series.status,
                    image_thumbnail_path: series.image_thumbnail_path,
                }



                await createSeries(data)
                router.refresh()

            } catch (error) {
                toast.error('Something went wrong')
            }

        })
    }
    const removeFromList = async () => {
        startTransition(async () => {
            deleteSeries(series.id.toString())
        })
        router.refresh()

    }
    return <main className='  w-full container'>
        <Button variant={"ghost"} onClick={() =>
            router.back()
        }><BiChevronsLeft className='w-4 h-4 mr-2' /> Go Back</Button>

        <div className='flex items-center flex-col'>
            <div className='flex gap-2 w-full py-2'>
                <Button className='w-full' disabled={isCreatingSeries || isDeletingSeries || isPending || isFavoriteLoading} variant={userSeries?.user_status && "destructive"} onClick={userSeries ? removeFromList : addToList}>
                    {userSeries ? (
                        <>
                            {isPending || isDeletingSeries ? <BiLoaderCircle className='w-4 h-4 mr-2 animate-spin' /> : <CiCircleRemove className='w-4 h-4 mr-2' />}
                            Remove from list
                        </>
                    )
                        : (
                            <>
                                {isPending || isCreatingSeries ? <BiLoaderCircle className='w-4 h-4 mr-2 animate-spin' /> : <BsPlusCircle className='w-4 h-4 mr-2' />}
                                Add to list
                            </>

                        )}
                </Button>
                {userSeries?.user_status &&
                    <Button className='w-full' onClick={updateStatus} disabled={isPending || isCreatingSeries || isFavoriteLoading || isDeletingSeries}>
                        {userSeries?.is_favorite ? (
                            <>
                                {
                                    isPending || isFavoriteLoading ? <BiLoaderCircle className='w-4 h-4 mr-2 animate-spin' /> : <BsHeartFill className='w-4 h-4 mr-2 text-red-500' />
                                }
                                Remove from favorites
                            </>
                        )
                            : (
                                <>
                                    {
                                        isPending || isFavoriteLoading ? <BiLoaderCircle className='w-4 h-4 mr-2 animate-spin ' /> : <BsHeartFill className='w-4 h-4 mr-2 text-red-500' />
                                    }
                                    Add to favorites
                                </>
                            )
                        }


                    </Button>}

            </div>
            <div className='w-[322px] h-[500px]'>
                <AspectRatio ratio={141 / 210} className='  '>
                    <Image
                        src={series.image_path}
                        alt={series.name}
                        fill
                        className='object-cover rounded-t-lg'
                    />
                </AspectRatio>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 border-2 gap-2 rounded-sm'>
                {series.pictures.map((picture, i) => (
                    <ModalImage
                        small={picture}
                        large={picture}
                        alt={series.name}
                        className='rounded-lg'
                        key={i}
                    />
                ))
                }
            </div>
            <div className='flex items-center justify-center'>
                <h1 className='text-center text-2xl font-bold py-2 '>
                    {series.name}
                </h1>
                <div>
                    {series.rating && <span className='text-sm text-gray-400 ml-2 flex items-center'>
                        <AiFillStar className='w-4 h-4 mr-2 text-yellow-500' />
                        {series.rating.slice(0, 3)}
                    </span>}
                </div>
            </div>
            <div className='flex items-center py-1 mb-2 justify-center gap-2 flex-wrap'>
                {series.genres.map((genre, i) => (
                    <Badge key={i}>
                        {genre}
                    </Badge>
                ))
                }
            </div>
            <p className='text-sm max-w-[500px] sm:text-base sm:max-w-[650px]'>
                {parse(series.description)}
            </p>
            {/* episodes */}
            <div className='flex flex-col items-center gap-2 w-full py-2'>
                <h2 className='text-xl font-bold'>
                    Episodes
                </h2>
                <div className='grid grid-cols-1 gap-5'>
                    {series.episodes.map((episode, i) => (
                        <div key={i} className='flex flex-col  rounded-md bg-gray-900 border-2 border-white p-3 gap-3 '>
                            <div><span className='font-bold text-lg'>Season</span> <span className='font-semibold text-sky-500 mr-2'>{episode.season}</span> <span className="font-bold text-lg">Episode</span> <span className='font-semibold text-sky-500  '>{episode.episode}</span>  -  <span className=''>{episode.name}</span></div>
                            <div>Air Date : {episode.air_date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>




    </main >
}

export default SeriesPage