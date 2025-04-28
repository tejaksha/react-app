import React from 'react'
// {title, vote_average, poster_path, release_date, original_language}

const MovieCard = ({ movie }) => {
  const { title, vote_average, poster_path, release_date, original_language } = movie;
  
  return (
    <div className='movie-card'>
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './no-movie.png'} 
        alt={title} 
        className="w-full h-auto rounded-t-lg"
      />
      <div className="mt-4">
        <h3 className='text-white font-bold'>{title}</h3>
        <div className="content">
            <div className="rating" >
                <img src="./star.svg" alt="Start Icon" />
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span></span>
            <p className="lang">{original_language}</p>

            <span></span>
            <p className="year">
                {release_date ? release_date.split('-')[0] : 'N/A'}
            </p>

        </div>
      </div>
    </div>
  )
}

export default MovieCard
