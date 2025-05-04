import React from 'react'
// {title, vote_average, poster_path, release_date, original_language}

const MovieCard = ({ movie }) => {
  if (!movie) return null;
  
  const { title, vote_average, poster_path, release_date, original_language } = movie;
  
  return (
    <div className='movie-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './no-movie.png'} 
        alt={title} 
        className="w-full h-auto object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = './no-movie.png';
        }}
      />
      <div className="p-4">
        <h3 className='text-white font-bold text-lg mb-2 truncate'>{title}</h3>
        <div className="flex items-center gap-2 text-gray-300">
            <div className="flex items-center gap-1">
                <img src="/star.svg" alt="Star Icon" className="w-4 h-4" />
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>
            <span>•</span>
            <p className="uppercase">{original_language}</p>
            <span>•</span>
            <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
