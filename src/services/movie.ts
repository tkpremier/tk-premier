import axios from 'axios';


async function getMovies() {
  /**
   * try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
   */
  const promise = await axios.get('https://api.themoviedb.org/3/movie/157336?api_key=04237d057779f6bd1952d49e48d790a4&append_to_response=credits')
      .catch((err) => { throw err; });
    return promise;
};

export default getMovies;