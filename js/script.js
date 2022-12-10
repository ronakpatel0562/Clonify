const collapsibles = document.querySelectorAll(".sidebar");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("sidelink__expanded");
  })
);

let songIndex = 0;
let masterHeart = document.getElementById("masterHeart");
let masterMute = document.getElementById("masterMute");
let masterPlay = document.getElementById("masterPlay");
let myTimeline = document.getElementById("myTimeline");
let sName = document.getElementById('sName');
let aName = document.getElementById('aName');
let search = document.getElementById('searchSong');
let hideSongs = document.getElementsByClassName("song-list");
let messege = document.getElementsByClassName("no-result");

const songsMix = [
  {
    songName: "Till I Collapse",
    artistName: "-by Eminem",
    songPath: "tracks/1-1.mp3"
  },
  {
    songName: "Fight Back",
    artistName: "-by NEFFEX",
    songPath: "tracks/1-2.mp3"
  },
  {
    songName: "Remember",
    artistName: "-by Fort Minor",
    songPath: "tracks/1-3.mp3"
  },
  {
    songName: "Believer",
    artistName: "-by Imagine Dragons",
    songPath: "tracks/1-4.mp3"
  },
  {
    songName: "Ignite",
    artistName: "-by Alan Walker",
    songPath: "tracks/1-5.mp3"
  },
  {
    songName: "Cradles",
    artistName: "-by Sub Urban",
    songPath: "tracks/1-6.mp3"
  }, {
    songName: "3:59 AM",
    artistName: "-by Divine",
    songPath: "tracks/2-1.mp3"
  },
  {
    songName: "Angaar",
    artistName: "-by Ikka",
    songPath: "tracks/2-2.mp3"
  },
  {
    songName: "Tandav",
    artistName: "-by Dino James",
    songPath: "tracks/2-3.mp3"
  },
  {
    songName: "Makasam",
    artistName: "-by KR$NA",
    songPath: "tracks/2-4.mp3"
  },
  {
    songName: "Dope Shope",
    artistName: "-by Yo Yo Honey Singh",
    songPath: "tracks/2-5.mp3"
  },
  {
    songName: "Sheikh Chilli",
    artistName: "-by Raftaar",
    songPath: "tracks/2-6.mp3"
  }, {
    songName: "Excuses",
    artistName: "-by A.P. Dhillon",
    songPath: "tracks/3-1.mp3"
  },
  {
    songName: "Born to Shine",
    artistName: "-by Diljit Dosanjh",
    songPath: "tracks/3-2.mp3"
  },
  {
    songName: "No Competiton",
    artistName: "-by Jass Manak",
    songPath: "tracks/3-3.mp3"
  },
  {
    songName: "295",
    artistName: "-by Sidhu Moose Wala",
    songPath: "tracks/3-4.mp3"
  },
  {
    songName: "8 Parche",
    artistName: "-by Baani Sandhu",
    songPath: "tracks/3-5.mp3"
  },
  {
    songName: "Suit",
    artistName: "-by Guru Randhawa",
    songPath: "tracks/3-6.mp3"
  }
];

function searchSong(val) {
  if(val == null || val == ''){
    return;
  }
  if(!messege[0].classList.contains("isHide")){
    messege[0].classList.add("isHide");
  }
  Array.from(hideSongs).forEach(card => {
    if(!card.classList.contains("isHide")){
      card.classList.add("isHide");
    }
  });
  let arr = [];
  songsMix.forEach(x => {
    if(x.songName.toLowerCase().includes(val.toLowerCase()))  {
      arr.push(x.songPath)
    }
  });
  if(arr.length == 0){
    messege[0].children[0].innerHTML = "No results found for ";
    messege[0].children[0].innerHTML += `"${val}"`;
    messege[0].classList.remove("isHide");
    return;
  }
  Array.from(hideSongs).forEach(card => {
    if(arr.find(x => x == card.id)){
      card.classList.remove("isHide");
    }
  });
}

let audioElement = new Audio();
audioElement.src = songsMix[songIndex].songPath;

masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    sName.innerText = songsMix[songIndex].songName;
    aName.innerText = songsMix[songIndex].artistName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementById('equlizer').style.opacity = 1;
    let id = songsMix[songIndex].songPath;
    let card = document.getElementById(id);
    card.classList.add('card--active');
    let playelement = card.getElementsByClassName('fa-play-circle')[0];
    playelement.classList.remove('fa-play-circle');
    playelement.classList.add('fa-pause-circle');
  }
  else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    document.getElementById('equlizer').style.opacity = 0;
    makeAllPlay();
    makeAllRegular();
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (songIndex >= 17) {
    songIndex = 0;
  }
  else {
    songIndex += 1;
  }
  let id = songsMix[songIndex].songPath;
  debugger;
  audioElement.src = id;
  let card = document.getElementById(id);
  audioElement.currentTime = 0;
  sName.innerText = songsMix[songIndex].songName;
  aName.innerText = songsMix[songIndex].artistName;
  audioElement.play();
  makeAllRegular();
  makeAllPlay();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  document.getElementById('equlizer').style.opacity = 1;
  card.classList.add('card--active');
  let playelement = card.getElementsByClassName('fa-play-circle')[0];
  playelement.classList.remove('fa-play-circle');
  playelement.classList.add('fa-pause-circle');
  document.getElementById('masterHeart').classList.add('far');
  document.getElementById('masterHeart').classList.remove('fas');
});

document.getElementById('back').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = 17;
  }
  else {
    songIndex -= 1;
  }
  let id = songsMix[songIndex].songPath;
  audioElement.src = id;
  let card = document.getElementById(id);
  audioElement.src = id;
  audioElement.currentTime = 0;
  sName.innerText = songsMix[songIndex].songName;
  aName.innerText = songsMix[songIndex].artistName;
  audioElement.play();
  makeAllRegular();
  makeAllPlay();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  document.getElementById('equlizer').style.opacity = 1;
  card.classList.add('card--active');
  let playelement = card.getElementsByClassName('fa-play-circle')[0];
  playelement.classList.remove('fa-play-circle');
  playelement.classList.add('fa-pause-circle');
  document.getElementById('masterHeart').classList.add('far');
  document.getElementById('masterHeart').classList.remove('fas');
});

masterMute.addEventListener('click', () => {
  if (audioElement.muted == false) {
    audioElement.muted = true;
    masterMute.classList.remove('fa-volume-up');
    masterMute.classList.add('fa-volume-mute');
  }
  else {
    audioElement.muted = false;
    masterMute.classList.remove('fa-volume-mute');
    masterMute.classList.add('fa-volume-up');
  }
});

masterHeart.addEventListener('click', (e) => {
  let element = e.target;
  if (element.classList.contains('far')) {
    element.classList.remove('far');
    element.classList.add('fas');
  }
  else {
    masterHeart.classList.add('far');
    masterHeart.classList.remove('fas');
  }

});

audioElement.addEventListener('timeupdate', () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 1000000);
  myTimeline.value = progress;
});

myTimeline.addEventListener('change', () => {
  audioElement.currentTime = (myTimeline.value * audioElement.duration) / 1000000;

});

function makeAllPlay() {
  Array.from(document.getElementsByClassName('fas--accent')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
}

function playFromSearch(id) {
  let element = document.getElementById(id);
  if (element.classList.contains("fa-pause-circle")) {
    audioElement.pause();
    makeAllPlay();
    makeAllRegular();
  }
  else{
    makeAllPlay();
    element.classList.remove('fa-play-circle');
    element.classList.add('fa-pause-circle');
    audioElement.src = `/tracks/${id}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllRegular();
    element.closest(".card").classList.add('card--active');
  } 
}

Array.from(document.getElementsByClassName('fas--accent')).forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target.classList.contains("fa-pause-circle")) {
      audioElement.pause();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      document.getElementById('equlizer').style.opacity = 0;
      makeAllPlay();
      makeAllRegular();
    }
    else {
      makeAllPlay();
      index = String(e.target.id);
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      audioElement.src = `/tracks/${index}.mp3`;
      let mySongIndex = index.split('-');
      songIndex = ((parseInt(mySongIndex[0]) - 1) * 6) + parseInt(mySongIndex[1] - 1);
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
      document.getElementById('equlizer').style.opacity = 1;
      makeAllRegular();
      e.target.closest(".card").classList.add('card--active');
      let currentSong = getSongByPath(`tracks/${index}.mp3`);
      sName.innerText = currentSong.songName;
      aName.innerText = currentSong.artistName;

    }
  });
});

function makeAllRegular() {
  Array.from(document.getElementsByClassName('card')).forEach((element) => {
    element.classList.remove('card--active');
  });
}

// Array.from(document.getElementsByClassName('card')).forEach((element) => {
//   element.addEventListener('click' , (e) => {
//     makeAllRegular();
//     element.classList.add('card--active');
//   });
// });

function getSongByPath(path) {
  return songsMix.filter(function (item) {
    return item.songPath === path;
  })[0];
}
