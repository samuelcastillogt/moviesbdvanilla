import buscar from "./assets/buscador.js"
import esconderMenu from "./assets/menu.js"
import {getData, getEpisodes } from "./assets/getData.js"
const menu = document.getElementById("menu")
const buscador = document.getElementById("buscador") 
const main = document.getElementById("main") 
const buscadorBtn = document.getElementById("buscador-btn")
const detalles = document.getElementById("detalles")
menu.addEventListener("click", esconderMenu)
buscadorBtn.addEventListener("click", async()=>{
    const search = buscador.value
    const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${search}`)
    const data = await response.json()
    main.innerHTML=`
    <a class="card" href="#${data.id}">
    <img src="${data.image.medium}">
    <p class="title">${data.name}</p>
    </a>
    `
})
window.addEventListener("load", ()=>{
    getData("?limit=20").then((data)=>{
        let peliculas = []
        data.map(
            (pelicula)=>{
                if(pelicula.id <= 20){
                    peliculas.push(pelicula)
                }
                
            }
        )
        peliculas.map((pelicula)=>{
            main.innerHTML+=`
            <a class="card" href="#${pelicula.id}">
            <img src="${pelicula.image.medium}">
            <p class="title">${pelicula.name}</p>
            </a>
            `
        })
    })
})
window.addEventListener("hashchange", ()=>{
    const id= window.location.hash.slice(1)
    console.log(id)
    getData(`/${id}`).then(data=>{
        main.classList.remove("main")
        detalles.classList.remove("hidden")
        detalles.classList.add("detalles")
        main.classList.add("hidden")
        detalles.innerHTML=""
        detalles.innerHTML=`
        <div class="detalles">
        <img src="${data.image.original}">
        <h2>${data.name}</h2>
        ${data.summary}
        <span id="cerrar">cerrar</span>
        </div>
        `
        document.getElementById("cerrar").addEventListener("click", ()=>{
            main.classList.remove("hidden")
            main.classList.add("main")
            detalles.classList.add("hidden")
            detalles.innerHTML= ""
        })
        
    })

})


