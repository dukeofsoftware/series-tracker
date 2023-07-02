'use client'

import { Series } from '@/types/series'
import Image from 'next/image'
import { FC } from 'react'
import Link from 'next/link'

interface SearchBarItemProps {
  data: Series
}

const SearchBarItem: FC<SearchBarItemProps> = ({
  data
}) => {
  return <Link href={`/series/${data.permalink}`} className='h-[5rem] flex items-center my-2 '>
    <div className='relative shrink-0 h-full w-[4rem]'>
      <Image alt={data.name} src={data.image_thumbnail_path} className="rounded-md object-cover" fill/>

    </div>

    <div className='ml-3 grow'>
      <h3 className='text-ellipsis	 font-semibold line-clamp-1'>{data.name}</h3>
      <p className='text-sm text-gray-500'>{data.status}</p>
    </div>

  </Link>
}

export default SearchBarItem