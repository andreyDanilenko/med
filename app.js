const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  // sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  // Time Display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button')
  // Длина контура
  const outlineLength = outline.getTotalLength();
  // Duration
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;
  // Выбрать другую музыку
  sounds.forEach(sound => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song)
    });
  });

  // Клик play
  play.addEventListener('click', () => {
    checkPlaying(song)
  });

  timeSelect.forEach(option => {
    option.addEventListener('click', function () {
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
    });
  });

  // Функция для воспроизведения и остановки
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './img/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './img/play.svg';
    }
  };
  // Анимировать круг
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      video.pause();
      play.src = './img/play.svg';
      song.currentTime = 0;
    };
  };
};

app()