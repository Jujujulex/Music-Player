let progress = document.querySelector("#progress");
let cntrlicon = document.querySelector(".cntrlicon");
let next = document.querySelector(".forward");
let prev = document.querySelector(".backward");
let audio = document.querySelector("audio");
let songCover = document.querySelector(".cover");
let artist = document.querySelector(".artist");
let title = document.querySelector(".songTitle");
let ulElement = document.querySelector("#song-list");
let volumeRange = document.querySelector("#volume-range");

let songList = [
  {
    path: "songs/Anna_Kendrick - Cups_When_I’m_Gone.mp3",
    songName: "Cups_When_I’m_Gone",
    artist: "Anna_Kendrick",
    cover: "images/Cups.jpeg",
  },

  {
    path: "songs/Bob_Marley - Everythings_gonna_be_alright.mp3",
    songName: "Everythings_gonna_be_alright",
    artist: "Bob_Marley",
    cover: "images/everything_gonna_be_alright.jpeg",
  },

  {
    path: "songs/Davido - Away.mp3",
    songName: "Away",
    artist: "Davido",
    cover: "images/Timeless.jpeg",
  },

  {
    path: "songs/Davido - Feel.mp3",
    songName: "Feel",
    artist: "Davido",
    cover: "images/Timeless.jpeg",
  },

  {
    path: "songs/Davido - FEM.mp3",
    songName: "FEM",
    artist: "Davido",
    cover: "images/fem.png",
  },

  {
    path: "songs/Davido_Ft_Musa_Keys - Unavailable.mp3",
    songName: "Unavailable",
    artist: "Davido",
    cover: "images/Timeless.jpeg",
  },
];

let song_playing = false;
let counter = 0;

//play song
function playSong() {
  song_playing = true;
  audio.play();
  cntrlicon.classList.add("fa-pause");
  cntrlicon.classList.remove("fa-play");
}

//pause song
function pauseSong() {
  song_playing = false;
  audio.pause();
  cntrlicon.classList.remove("fa-pause");
  cntrlicon.classList.add("fa-play");
}

//pause or play on click
cntrlicon.addEventListener("click", () =>
  song_playing ? pauseSong() : playSong()
);

//load songs
function loadSongs(songList) {
  title.textContent = songList.songName;
  artist.textContent = songList.artist;
  audio.src = songList.path;
  songCover.src = songList.cover;
  audio.volume = volumeRange.value / 100;
}

audio.addEventListener("play", function () {
  songCover.style.display = "block"; // show the cover photo when the song starts playing
});

//once loaded, select the first song on the songlist
loadSongs(songList[5]);

//previous song
prev.addEventListener("click", function () {
  counter--;
  if (counter < 0) {
    counter = songList.length - 1;
  }
  loadSongs(songList[counter]);
  playSong();
});
//next song
next.addEventListener("click", function () {
  counter++;
  if (counter > songList.length - 1) {
    counter = 0;
  }
  loadSongs(songList[counter]);
  playSong();
});

//getting the progress bar functional
audio.onloadedmetadata = function () {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
};

audio.addEventListener("play", function () {
  setInterval(() => {
    progress.value = audio.currentTime;
  }, 1000);
});

progress.oninput = function () {
  audio.currentTime = progress.value;
  cntrlicon.classList.add("fa-pause");
  cntrlicon.classList.remove("fa-play");
};

songList.forEach((song) => {
  let li = document.createElement("li"),
    i = document.createElement("i");

  i.classList.add("fa-solid", "fa-music");
  i.style.marginRight = "8px";
  li.innerText = song.artist + " - " + song.songName;
  li.prepend(i);

  li.addEventListener("click", function () {
    /** Change all the icons to the default */
    let icon = this.querySelector("i");
    document.querySelectorAll("ul li i").forEach(function (i) {
      i.classList.remove("fa-play");
      i.classList.add("fa-music");
    });
    /** Pause the currently playing song */
    pauseSong();
    /** Load the clicked song */
    loadSongs(song);
    /** Change the icon of the selected icon in the list */
    icon.classList.remove("fa-music");
    icon.classList.add("fa-play");
    /** Finally play the loaded song */
    playSong();
  });
  ulElement.appendChild(li);
});

// update volume of audio based on volume range
volumeRange.addEventListener("change", () => {
  audio.volume = volumeRange.value / 100;
});
