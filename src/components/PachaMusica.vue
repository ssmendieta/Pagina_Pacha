<template>
  <div id="musica-page">
    <Header />

    <section class="musica-hero">
      <h1>🎧 La Música de Pacha</h1>
      <p>Escucha lo que suena en nuestras noches</p>
    </section>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="cargarPlaylist">Reintentar</button>
    </div>

    <div class="musica-content">

      <section class="playlist-section">
        

        <div v-if="loadingPlaylist" class="playlist-header skeleton-header">
          <div class="skeleton skeleton-cover"></div>
          <div class="skeleton-info">
            <div class="skeleton skeleton-tag"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-desc"></div>
            <div class="skeleton skeleton-btn"></div>
          </div>
        </div>

        <div v-else-if="playlist" class="playlist-header">
          <img :src="playlist.images[0]?.url" class="playlist-cover" loading="lazy">
          <div class="playlist-info">
            <span class="tag">PLAYLIST</span>
            <h2>{{ playlist.name }}</h2>
            <p class="desc">{{ playlist.description }}</p>
            <p class="stats">{{ playlist.tracks.total }} canciones</p>
            <a :href="playlist.external_urls.spotify" target="_blank" class="btn-spotify">
              ▶ Abrir en Spotify
            </a>
          </div>
        </div>


        <div v-if="loadingPlaylist" class="tracks-list">
          <div v-for="n in 6" :key="n" class="track skeleton-track">
            <div class="skeleton skeleton-num"></div>
            <div class="skeleton skeleton-img"></div>
            <div class="skeleton-track-info">
              <div class="skeleton skeleton-name"></div>
              <div class="skeleton skeleton-artist"></div>
            </div>
          </div>
        </div>
        <div v-else-if="playlist" class="tracks-list">
          <div 
            v-for="(item, index) in playlist.tracks.items.slice(0, 10)" 
            :key="item.track?.id"
            class="track"
            @click="reproducir(item.track)"
          >
            <span class="track-num">{{ index + 1 }}</span>
            <img 
              :src="item.track?.album?.images[2]?.url" 
              class="track-img"
              loading="lazy"
            >
            <div class="track-info">
              <p class="track-name">{{ item.track?.name }}</p>
              <p class="track-artist">{{ item.track?.artists[0]?.name }}</p>
            </div>
            <span class="track-duration">
              {{ formatDuration(item.track?.duration_ms) }}
            </span>
          </div>
        </div>
      </section>

    </div>

    <div v-if="trackActual" class="reproductor">
      <img :src="trackActual.album?.images[2]?.url">
      <div class="reproductor-info">
        <p class="nombre">{{ trackActual.name }}</p>
        <p class="artista">{{ trackActual.artists[0]?.name }}</p>
      </div>
      <audio ref="audio" :src="trackActual.preview_url" autoplay></audio>
      <button @click="togglePlay" class="btn-play">{{ isPlaying ? '⏸' : '▶' }}</button>
      <button @click="trackActual = null" class="btn-cerrar">✕</button>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import { spotifyService } from '../servicio/spotify';

export default {
  name: 'PachaMusica',
  components: { Header, Footer },

  data() {
    return {
      loadingPlaylist: true,
      error: null,
      playlist: null,
      nuevosLanzamientos: [],
      playlistsRecomendadas: [],
      trackActual: null,
      isPlaying: false,
      playlistId: '4F8bubXqBbuelwjepuZlvD'
    };
  },

  mounted() {
    this.cargarPlaylist();
  },

  methods: {

    async cargarPlaylist() {
      this.loadingPlaylist = true;
      this.error = null;

      try {
        this.playlist = await spotifyService.getPlaylist(this.playlistId);
        this.loadingPlaylist = false;

      } catch (err) {
        this.error = 'No se pudo cargar la música';
        this.loadingPlaylist = false;
        console.error(err);
      }
    },


    async cambiarPlaylist(id) {
      this.loadingPlaylist = true;
      try {
        this.playlist = await spotifyService.getPlaylist(id);
      } catch (err) {
        console.error(err);
      } finally {
        this.loadingPlaylist = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    reproducir(track) {
      if (!track?.preview_url) {
        window.open(track?.external_urls?.spotify, '_blank');
        return;
      }
      this.trackActual = track;
      this.isPlaying = true;
    },

    togglePlay() {
      const audio = this.$refs.audio;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },

    formatDuration(ms) {
      return spotifyService.formatDuration(ms);
    }
  }
};
</script>

<style scoped>

.skeleton {
  background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 5px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-header {
  display: flex;
  gap: 30px;
  align-items: flex-end;
}

.skeleton-cover {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}

.skeleton-info {
  flex: 1;
}

.skeleton-tag {
  width: 80px;
  height: 15px;
  margin-bottom: 10px;
}

.skeleton-title {
  width: 250px;
  height: 35px;
  margin-bottom: 15px;
}

.skeleton-desc {
  width: 300px;
  height: 20px;
  margin-bottom: 20px;
}

.skeleton-btn {
  width: 150px;
  height: 45px;
  border-radius: 25px;
}

.skeleton-track {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 20px;
}

.skeleton-num {
  width: 25px;
  height: 20px;
}

.skeleton-img {
  width: 45px;
  height: 45px;
}

.skeleton-track-info {
  flex: 1;
}

.skeleton-name {
  width: 180px;
  height: 18px;
  margin-bottom: 8px;
}

.skeleton-artist {
  width: 120px;
  height: 14px;
}


.musica-hero {
  background: linear-gradient(135deg, #1db954, #191414, #ee05f2);
  padding: 80px 20px;
  text-align: center;
}

.musica-hero h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}

.error {
  text-align: center;
  padding: 40px;
  color: #ff6b6b;
}

.error button {
  margin-top: 15px;
  padding: 12px 30px;
  background: #1db954;
  border: none;
  border-radius: 25px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
}


.musica-content {
  background: #0a0a0a;
  padding-bottom: 100px;
}

.playlist-section {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.playlist-header {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  align-items: flex-end;
}

.playlist-cover {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}

.playlist-info .tag {
  font-size: 12px;
  color: #888;
}

.playlist-info h2 {
  font-size: 2rem;
  margin: 10px 0;
}

.playlist-info .desc {
  color: #888;
  margin-bottom: 10px;
}

.playlist-info .stats {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.btn-spotify {
  display: inline-block;
  padding: 14px 30px;
  background: #1db954;
  color: #000;
  font-weight: bold;
  border-radius: 30px;
  text-decoration: none;
  transition: transform 0.3s;
}

.btn-spotify:hover {
  transform: scale(1.05);
}


.tracks-list {
  background: rgba(255,255,255,0.03);
  border-radius: 10px;
  overflow: hidden;
}

.track {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.track:hover {
  background: rgba(255,255,255,0.1);
}

.track-num {
  width: 30px;
  color: #888;
  text-align: center;
}

.track-img {
  width: 45px;
  height: 45px;
  border-radius: 5px;
}

.track-info {
  flex: 1;
}

.track-name {
  font-weight: 500;
  margin-bottom: 3px;
}

.track-artist {
  font-size: 13px;
  color: #888;
}

.track-duration {
  color: #888;
}


.nuevos-section, .recomendadas-section {
  padding: 60px 40px;
}

.nuevos-section h2, .recomendadas-section h2 {
  text-align: center;
  margin-bottom: 40px;
}

.albums-grid, .playlists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.album-card, .playlist-card {
  background: #181818;
  border-radius: 10px;
  padding: 15px;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s;
  cursor: pointer;
}

.album-card:hover, .playlist-card:hover {
  background: #282828;
  transform: translateY(-5px);
}

.album-card img, .playlist-card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
}

.album-card h4, .playlist-card h4 {
  font-size: 14px;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-card p, .playlist-card p {
  color: #888;
  font-size: 13px;
}


.reproductor {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, #181818, #282828);
  padding: 15px 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1000;
  border-top: 1px solid #333;
}

.reproductor img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.reproductor-info {
  flex: 1;
}

.reproductor .nombre {
  font-weight: bold;
}

.reproductor .artista {
  font-size: 13px;
  color: #888;
}

.btn-play {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #1db954;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.btn-cerrar {
  background: transparent;
  border: none;
  color: #888;
  font-size: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .playlist-header, .skeleton-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .playlist-cover, .skeleton-cover {
    width: 180px;
    height: 180px;
  }

  .musica-hero h1 {
    font-size: 2rem;
  }
}
</style>