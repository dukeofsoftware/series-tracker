import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import axios from 'axios';
import { FC } from 'react'
import SeriesPage from './SeriesPage';

interface pageProps {
  params: {
    name: string
  }
}

const Page: FC<pageProps> = async ({ params: { name } }) => {
  const user = await currentUser();

  const userSeries = await db.userSeries.findFirst({
    where: {
      permalink: name,
      userId: user?.id
    },})

  const series = await axios.get(`https://www.episodate.com/api/show-details?q=${name}`).then(res => res.data.tvShow)
    

  return <SeriesPage series={series} userSeries={userSeries} />

}

export default Page