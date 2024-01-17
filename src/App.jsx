import Searchbar from "./components/Searchbar.jsx";
import FotoList from "./components/FotoList.jsx";
import FotoAmpliada from "./components/FotoAmpliada.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {

  const [query, setQuery] = useState("")
  const [categoria, setCategoria] = useState("")
  const [fotos, setFotos] = useState([])
  const [fotoAmpliada, setFotoAmpliada] = useState(null)
  const [activateSearch, setActivateSearch] = useState(false)

  const fetchData = async ({query, categoria}) => {
    const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY
    if (query || categoria){
      let searchQuery = query

      searchQuery = query && categoria ? `${query} ${categoria}` : categoria

      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          client_id: apiKey,
          query: searchQuery
        }
      })
      console.log(response.data)
      setFotos(response.data.results)

      return
    }

    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: apiKey,
        count: 10
      }
    })
    setFotos(response.data)
  }

  useEffect(() => {
    fetchData({query, categoria})
  }, [])

  useEffect(() => {
    console.log(query)
    if (activateSearch){
      fetchData({query, categoria})
      setActivateSearch(false)
    }
  }, [activateSearch])

  return (
    <div className="container">
      <Searchbar setQuery={setQuery} setCategoria={setCategoria} setActivateSearch={setActivateSearch}/>
      <FotoList fotos={fotos} setFotoAmpliada={setFotoAmpliada}/>
      {fotoAmpliada && (
          <FotoAmpliada foto={fotoAmpliada} setFotoAmpliada={setFotoAmpliada}/>
      )}
    </div>
  )
}

export default App
