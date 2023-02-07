
class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  },
});

export default moviesApi;
