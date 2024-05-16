import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import Footer from './Footer';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importation des styles Bootstrap
import FirstRow from './component/FirstRow';
import SecondRow from './component/SecondRow';
import ThirdRow from './component/thirdRow';
import FourthRow from './component/fourtRow';

const Movie = () => {
  const { id,userID } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieData,setMovieData] =useState();
  const [backgroundImageUrl,setBackgroundImageUrl]=useState();

  const [data, setData] = useState({});
  //const [idMOvie,setIdmovie]=useState();

  //const backgroundImageUrl = data.Poster;

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getData() {
      if (id) {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI3N2U4NzIyNjA4YTNjOGU1YWNjZmQ0ZTVmZDk0ZSIsInN1YiI6IjY2MTVkMjg2YWM0MTYxMDE3YzkyOTlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCbzx_EgdSfu_R2NVoQ8pGKqwIFfm8tXz-yd3HoLJX8',
          },
        };

        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
          );
          const data = await response.json();
          setMovie(data.imdb_id || null);
          console.log(data);
          setMovieData(data);

          setLoading(false); // Arrêtez le chargement en cas d'erreur

        } catch (error) {
          console.error(error);
          setMovie(null);
        }
      }
    }
    getData();
  }, [id]);


  //
  useEffect(
    ()=>{
      const fetchMovieDetails = async (movieId) => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI3N2U4NzIyNjA4YTNjOGU1YWNjZmQ0ZTVmZDk0ZSIsInN1YiI6IjY2MTVkMjg2YWM0MTYxMDE3YzkyOTlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCbzx_EgdSfu_R2NVoQ8pGKqwIFfm8tXz-yd3HoLJX8' // Remplacez par votre token d'authentification
          }
        };
      
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=reviews`, options);
          const data = await response.json();
          console.log(data.reviews.results); // Affiche les avis des utilisateurs dans la console
          return data.reviews.results;
        } catch (error) {
          console.error(error);
          return []; // En cas d'erreur, retourne un tableau vide
        }
      };

      fetchMovieDetails(id);
    }
    ,
    [id]
  )
  


  //


  useEffect(() => {
    const apiKey = '2b73a326';
    //const searchQuery = 'the godfather';
    const url = `http://www.omdbapi.com/?i=${movie}&apikey=${apiKey}`;
  
  
    axios.get(url)
        .then(response => {
            const donne = response.data;
            //setYears(donne.Year);
            //console.log(donne.Rated);
            setData(donne);
            console.log(donne.Title);
            setLoading(false); // Les données sont chargées, donc setLoading à false
  
  
  
  
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données de l\'API OMDB:', error);
            setLoading(false); // Arrêtez le chargement en cas d'erreur
  
        });
  }, [movie]); 
  
  useEffect(
    ()=>{
      if (movieData && movieData.backdrop_path) {
        console.log(movieData.backdrop_path);
              setBackgroundImageUrl(`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`);


      }
      //console.log(`https://image.tmdb.org/t/p/original${movieData}`);

      // setBackgroundImageUrll(`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`);

      
    },
    [movieData]
  );
  
  
  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImageUrl})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  //backgroundPosition: 'center',
  position: 'absolute',
  // width: '100vw',
  // height: '1000px',  
  
  };
  
  



  return (
    <>
      
      
      <Header/>
          <section>
            {loading ? (
              <p>Loading...</p>
            ) : data ? (
                <div className="container-fluid "style={containerStyle} >
                    <FirstRow data={data} ID={id} />
                    <SecondRow userID={userID}
                  
                    data={data} />
                    <ThirdRow data={data} />
                    <FourthRow data={data} userID={userID} companie={movieData} />
                </div>
            ) : (
              <p>No film available</p>
            )}
          </section>
      <Footer/>
    </>
  );
};

export default Movie;