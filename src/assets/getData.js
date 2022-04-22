const API = "https://api.tvmaze.com/shows"
const APIEpisodes = "https://api.tvmaze.com/seasons"
const getData = async(id)=>{
    const API_URL= `${API}${id}`
    const data = await fetch(API_URL)
    const datos = await data.json()
      return datos
 }
 const getEpisodes= async(id)=>{
  const API_URL= `${APIEpisodes}/${id}/episodes`
  const data = await fetch(API_URL)
  const datos = await data.json()
   return datos
 }
 export  {getData, getEpisodes }