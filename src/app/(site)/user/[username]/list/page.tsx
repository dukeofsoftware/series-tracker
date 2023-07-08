import { FC, cache } from 'react'
import ListPage from './ListPage'
import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs'
import { SeriesType } from '@/lib/validators/series'

interface pageProps { }

const Page: FC<pageProps> = async ({ }) => {



  return <ListPage  />
}

export default Page