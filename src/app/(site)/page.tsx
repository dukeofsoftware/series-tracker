
import SeriesFeed from "./SeriesFeed"
import axios from "axios"

export default async function Home() {

  const cachedData = await axios.get(`https://www.episodate.com/api/most-popular?page=${1}`).then(res => res.data)

  return (
    <div>

      <SeriesFeed cachedData={cachedData} />
    </div>
  )
}
