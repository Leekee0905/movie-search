export const getTopRatedMoviesList = async (params) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${params}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWQ2MTA2NWIwOWVhN2I1YTU0YTI4ZDNjZWVhNzJlNiIsIm5iZiI6MTcyMTYxNTQ4My4xNDU4MTgsInN1YiI6IjY2OWRhYWYwZmZlYzQxZWExMzRiY2JlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vN9DGB3FAge_69w5AMXHuyAOuyBNdRJzzoRQWyt0FUY",
    },
  };

  const response = await fetch(url, options).then((res) => res.json());
  return response;
};

export const getPlayingMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWQ2MTA2NWIwOWVhN2I1YTU0YTI4ZDNjZWVhNzJlNiIsIm5iZiI6MTcyMTYxNTQ4My4xNDU4MTgsInN1YiI6IjY2OWRhYWYwZmZlYzQxZWExMzRiY2JlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vN9DGB3FAge_69w5AMXHuyAOuyBNdRJzzoRQWyt0FUY",
    },
  };
  const response = await fetch(url, options).then((res) => res.json());
  return response;
};
