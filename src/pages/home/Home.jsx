import "./home.css"
import React, { useEffect, useState } from 'react'
import axios from "axios";

const Home = () => {
    const [movies, setMovies] = useState(""); //for storing the fetched movies
    const [searchTerm, setSearchTerm] = useState(""); //for storing movies searched term
    const [searchType, setSearchType] = useState(""); //for storing movie type/category

useEffect(()=>{
    getMovies(searchTerm, searchType);
},[searchTerm, searchType]);

const getMovies = async (searchTerm, searchType) =>{
    try{
        const response = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&type=${searchType}&apikey=d9c7bea4`);
        console.log(response.data.Search);
        setMovies(response.data.Search);
    }catch(err){
      
    }
}

  return (
    <div className="movies">
        <input type="text" onChange={(e)=>setSearchTerm(e.target.value)}/>
        <select onChange={(e)=>setSearchType(e.target.value)}>
            <option value="" disabled>Select Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
        </select>
        {movies &&
    movies.map(({imdbID, Poster, Title, Type, Year})=>{ //i chose to destructure it here. Alternaltively, i could just put eg "person" in the bracket, and in the jsx below, write "person.title", "person.age" etc.
        return(
            <div className="card" key={imdbID}>
                <div className="imgWrapper">
                 <img src={Poster} alt="pictures" className="cardImage" />
                </div>
                <p>Title: {Title}</p>
                <p>Type: {Type}</p>
                <p>Year: {Year}</p>
            </div>
          
        )
    })
    
    }
        
    </div>
  )
}

export default Home