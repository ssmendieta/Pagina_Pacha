const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export const spotifyService = {
  async getToken() {
    const cached = localStorage.getItem('spotify_token');
    const expiry = localStorage.getItem('spotify_token_expiry');
    
    if (cached && expiry && Date.now() < Number(expiry)) {
      return cached;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
      });

      const data = await response.json();
      
      localStorage.setItem('spotify_token', data.access_token);
      localStorage.setItem('spotify_token_expiry', Date.now() + (data.expires_in * 1000));
      
      return data.access_token;
    } catch (error) {
      console.error('Error obteniendo token:', error);
      throw error;
    }
  },

  async getPlaylist(playlistId) {
    const token = await this.getToken();
    const fields = 'name,description,images,external_urls,tracks.total,tracks.items(track(id,name,duration_ms,preview_url,external_urls,artists(name),album(name,images)))';
    
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}?fields=${fields}&limit=10`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    return response.json();
  },

  async searchPlaylists(query, limit = 4) {
    const token = await this.getToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=${limit}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const data = await response.json();
    return data.playlists.items;
  },

async getLatinPartyPlaylists(limit = 6) {
  const token = await this.getToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=fiesta%20latina&type=playlist&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  const data = await response.json();
  return data.playlists.items;
},


  formatDuration(ms) {
    if (!ms) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  },

  async getRecommendationsByGenres(genres, limit = 10) {
  const params = new URLSearchParams({
    seed_genres: genres.join(','),
    limit
  });

  const res = await fetch(
    `https://api.spotify.com/v1/recommendations?${params}`,
    {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }
  );

  const data = await res.json();
  return data.tracks;
}

};