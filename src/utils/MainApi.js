class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCurrentUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
        headers: {
          ...this._headers,
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include'
    })
    .then(res => this._getResponseData(res));
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      credentials: 'include'
    })
    .then(res => this._getResponseData(res));
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include'
    })
    .then(res => this._getResponseData(res));
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include'
    })
    .then(res => this._getResponseData(res));
  }

  updateProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name,
        email
      }),
    })
    .then(res => this._getResponseData(res));
  }

  addMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailer,
        thumbnail: movie.image,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
      credentials: 'include'
    })
    .then(res => this._getResponseData(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      credentials: 'include'
    })
    .then(res => this._getResponseData(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
      credentials: 'include'
    })
    .then(res => this._getResponseData(res));
  }
}

const api = new MainApi({
  baseUrl: 'https://hancorg-movies.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  },
});

export default api;
