import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const authApi = axios.create({
  baseURL: 'https://accounts.spotify.com/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1'
});

spotifyApi.interceptors.request.use(
  async (config) => {
    const token = await spotifyService.getToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

spotifyApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API de Spotify:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const spotifyService = {
  async getToken() {
    const cached = localStorage.getItem('spotify_token');
    const expiry = localStorage.getItem('spotify_token_expiry');
    
    if (cached && expiry && Date.now() < Number(expiry)) {
      return cached;
    }

    try {
      const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      
      const response = await authApi.post('/token', 
        'grant_type=client_credentials',
        {
          headers: {
            'Authorization': `Basic ${credentials}`
          }
        }
      );

      const { access_token, expires_in } = response.data;
      
      localStorage.setItem('spotify_token', access_token);
      localStorage.setItem('spotify_token_expiry', String(Date.now() + (expires_in * 1000)));
      
      return access_token;
    } catch (error) {
      console.error('Error obteniendo token:', error);
      throw error;
    }
  },

  async getPlaylist(playlistId) {
    const fields = 'name,description,images,external_urls,tracks.total,tracks.items(track(id,name,duration_ms,preview_url,external_urls,artists(name),album(name,images)))';
    
    try {
      const response = await spotifyApi.get(`/playlists/${playlistId}`, {
        params: {
          fields,
          limit: 10
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async searchPlaylists(query, limit = 4) {
    try {
      const response = await spotifyApi.get('/search', {
        params: {
          q: query,
          type: 'playlist',
          limit
        }
      });
      return response.data.playlists.items;
    } catch (error) {
      throw error;
    }
  },

  async getLatinPartyPlaylists(limit = 6) {
    try {
      const response = await spotifyApi.get('/search', {
        params: {
          q: 'fiesta latina',
          type: 'playlist',
          limit
        }
      });
      return response.data.playlists.items;
    } catch (error) {
      throw error;
    }
  },

  async getRecommendationsByGenres(genres, limit = 10) {
    try {
      const response = await spotifyApi.get('/recommendations', {
        params: {
          seed_genres: genres.join(','),
          limit
        }
      });
      return response.data.tracks;
    } catch (error) {
      throw error;
    }
  },

  async getNewReleases(limit = 6) {
    try {
      const response = await spotifyApi.get('/browse/new-releases', {
        params: { limit }
      });
      return response.data.albums.items;
    } catch (error) {
      throw error;
    }
  },

  async getTrack(trackId) {
    try {
      const response = await spotifyApi.get(`/tracks/${trackId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getArtist(artistId) {
    try {
      const response = await spotifyApi.get(`/artists/${artistId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  formatDuration(ms) {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  }
};