class MusicPlayer {
    constructor() {
        this.audioPlayer = document.getElementById('audio-player');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.seekSlider = document.getElementById('seek-slider');
        this.volumeSlider = document.getElementById('volume-slider');
        this.currentTimeElement = document.getElementById('current-time');
        this.durationElement = document.getElementById('duration');
        this.playlistElement = document.getElementById('playlist-items');
        this.albumArt = document.getElementById('album-art');

        this.currentTrack = 0;
        this.isPlaying = false;

        this.playlist = [
            { title: "Hold On, We're Going Home (feat. Majid Jordan)", artist: "Drake", album: "Nothing Was The Same", src: "assets/HOWGH.mp3", cover: "assets/album-cover.jpeg" },
            { title: "GLOCK", artist: "Don Toliver", album: "Hardstone Psycho", src: "assets/GLOCK.mp3", cover: "assets/album-cover-2.jpeg" },
            { title: "I Feel It Coming ft. Daft Punk", artist: "The Weeknd", album: "Starboy", src: "assets/IFIC.mp3", cover: "assets/album-cover-3.jpeg" }
        ];

        this.initPlayer();
        this.addEventListeners();
    }

    initPlayer() {
        this.updatePlaylist();
        this.loadTrack(this.currentTrack);
    }

    addEventListeners() {
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.playPreviousTrack());
        this.nextBtn.addEventListener('click', () => this.playNextTrack());
        this.seekSlider.addEventListener('input', () => this.seek());
        this.volumeSlider.addEventListener('input', () => this.setVolume());
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('ended', () => this.playNextTrack());
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.audioPlayer.pause();
            this.playPauseBtn.textContent = '▶';
        } else {
            this.audioPlayer.play();
            this.playPauseBtn.textContent = '⏸';
        }
        this.isPlaying = !this.isPlaying;
    }

    loadTrack(trackIndex) {
        if (trackIndex >= 0 && trackIndex < this.playlist.length) {
            const track = this.playlist[trackIndex];
            this.audioPlayer.src = track.src;
            document.getElementById('song-title').textContent = track.title;
            document.getElementById('song-artist').textContent = track.artist;
            document.getElementById('song-album').textContent = track.album;
            this.albumArt.src = track.cover;
            this.currentTrack = trackIndex;
            this.updateActiveTrack();
        }
    }

    playPreviousTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) this.audioPlayer.play();
    }

    playNextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) this.audioPlayer.play();
    }

    seek() {
        const seekTo = this.audioPlayer.duration * (this.seekSlider.value / 100);
        this.audioPlayer.currentTime = seekTo;
    }

    setVolume() {
        this.audioPlayer.volume = this.volumeSlider.value / 100;
    }

    updateProgress() {
        const duration = this.audioPlayer.duration;
        const currentTime = this.audioPlayer.currentTime;
        const percentage = (currentTime / duration) * 100;
        this.seekSlider.value = percentage;
        this.currentTimeElement.textContent = this.formatTime(currentTime);
        this.durationElement.textContent = this.formatTime(duration);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    updatePlaylist() {
        this.playlistElement.innerHTML = '';
        this.playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.textContent = `${track.title} - ${track.artist}`;
            li.addEventListener('click', () => {
                this.loadTrack(index);
                if (this.isPlaying) this.audioPlayer.play();
            });
            this.playlistElement.appendChild(li);
        });
    }

    updateActiveTrack() {
        const playlistItems = this.playlistElement.getElementsByTagName('li');
        for (let i = 0; i < playlistItems.length; i++) {
            if (i === this.currentTrack) {
                playlistItems[i].classList.add('active');
            } else {
                playlistItems[i].classList.remove('active');
            }
        }
    }
}

// Initialize the music player when the page loads
window.onload = () => {
    new MusicPlayer();
};