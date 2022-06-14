const API = "https://api.themoviedb.org/3"
const API_KEY= "96bb466d4452785d2527e4b3f208a8da"

const getAllMovietrends = async()=>{
    const url = `${API}/trending/movie/day?api_key=${API_KEY}`
    const request =  await fetch(url)
    const res = await request.json()
    res.results.map(movie =>{
        document.getElementById("trends").innerHTML +=` <a class="card" href="#/movie/${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img">
        <p class="card-title">${movie.title}</p>
        </a>`
    })
}
const getAllCategories=async()=>{
    const url = `${API}/genre/movie/list?api_key=${API_KEY}`
    const request =  await fetch(url)
    const res = await request.json()
    res.genres.map(category => {
        document.getElementById("categorias").innerHTML+=`<a class="category" href="#/category/${category.id}">${category.name}</a>`
    })
}
const getMovieDetails = async(id)=>{
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const request =  await fetch(url)
    const res = await request.json()
    console.log(res)
    return res
}
const getSimilarsMovies = async(id)=>{
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US`
    const request =  await fetch(url)
    const res = await request.json()
    return res
}
window.addEventListener("hashchange", ()=>{
    window.scroll({
        top: 0,
    })
    const ubicacion = window.location.hash
    // document.getElementById("home").classList.add("hidden")
    // document.getElementById("header").classList.add("hidden")
    if(ubicacion.includes("/category/")){
        console.log("es categoria")
    }
    if(ubicacion.includes("/movie/")){
       composeCard(ubicacion)
       }
})
const composeCard= async(ubicacion)=>{
    document.getElementById("home").classList.add("hidden")
    document.getElementById("header").classList.add("hidden")
    const movieId = ubicacion.replace("#/movie/", "")
    const movieContainer= document.getElementById("detalles")
    const movieHeader= document.getElementById("detalles-header")
    const movieCard= document.getElementById("detalles-card")
    movieCard.innerHTML=""
    movieHeader.innerHTML=""
    movieContainer.classList.remove("hidden")
    const data = await getMovieDetails(movieId)
    
    const image = document.createElement("img")
    image.setAttribute("src","https://image.tmdb.org/t/p/w500"+ data.backdrop_path)
    const titleContainer = document.createElement("h2")
    const returnContainer = document.createElement("div")
    const returnText = document.createTextNode("<")
    returnContainer.setAttribute("id","return")
    returnContainer.appendChild(returnText)
    const descriptionContainer = document.createElement("p")
    const titleText = document.createTextNode(data.title)
    const descriptionText = document.createTextNode(data.overview)
    titleContainer.appendChild(titleText)
    descriptionContainer.appendChild(descriptionText)
    movieHeader.appendChild(image)
    movieHeader.appendChild(returnContainer)
    movieCard.appendChild(titleContainer)
    movieCard.appendChild(descriptionContainer)
    movieCard.innerHTML += `
    <div class="botonera">
    <div class="detalle">
    <a href="${data.homepage}"><i class="material-icons">theaters</i> Ver</a>
    </div>
    <div class="detalle">
    Calificaicon: ${data.vote_average}
    </div>
    <div class="detalle">
    Duracion: ${data.runtime}
    </div>
    
    
    </div>
    `
    const similars= await getSimilarsMovies(movieId)
    document.getElementById("similares").innerHTML=""
    similars.results.map(movie=> {  
        document.getElementById("similares").innerHTML +=` <a class="card" href="#/movie/${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img">
        <p class="card-title">${movie.title}</p>
        </a>`
    })
   document.getElementById("return").addEventListener("click", async()=>{
    document.getElementById("home").classList.toggle("hidden")
    document.getElementById("header").classList.remove("hidden")
    movieCard.innerHTML=""
    movieHeader.innerHTML=""
    movieContainer.classList.add("hidden") 
    window.history.back()
}) 
}
window.addEventListener("load", ()=>{
    getAllMovietrends()
    getAllCategories()
})
