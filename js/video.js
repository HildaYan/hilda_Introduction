
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('projectVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const muteBtn = document.getElementById('muteBtn');
  const progressBar = document.getElementById('progressBar');
  const progressContainer = document.querySelector('.progress-container');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const videoWrapper = document.querySelector('.video-wrapper');

  // 強制自動播放（靜音 + 循環）
  const startAutoPlay = () => {
    video.muted = true;
    video.loop = true;
    video.play().catch(error => {
      console.log("自動播放被阻止，等待使用者互動", error);
      // 備用：使用者第一次點擊頁面後啟動
      const activateOnClick = () => {
        video.play();
        document.body.removeEventListener('click', activateOnClick);
      };
      document.body.addEventListener('click', activateOnClick, { once: true });
    });
  };

  // 初始化自動播放
  startAutoPlay();

  // 格式化時間
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 更新進度條
  const updateProgress = () => {
    if (video.duration) {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percent}%`;
      currentTimeEl.textContent = formatTime(video.currentTime);
    }
  };

  // 播放/暫停按鈕
  playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (video.paused) {
      video.play();
      playPauseBtn.querySelector('.icon-play').style.display = 'none';
      playPauseBtn.querySelector('.icon-pause').style.display = 'block';
    } else {
      video.pause();
      playPauseBtn.querySelector('.icon-play').style.display = 'block';
      playPauseBtn.querySelector('.icon-pause').style.display = 'none';
    }
  });

  // 靜音切換
  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    muteBtn.querySelector('.icon-volume').style.display = video.muted ? 'none' : 'block';
    muteBtn.querySelector('.icon-mute').style.display = video.muted ? 'block' : 'none';
  });

  // 進度條點擊
  progressContainer.addEventListener('click', (e) => {
    e.stopPropagation();
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  });

  // 全螢幕
  fullscreenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();
  });

  // 時間更新
  video.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(video.duration);
  });
  video.addEventListener('timeupdate', updateProgress);

  // 點擊影片 → 新分頁開啟
  videoWrapper.addEventListener('click', (e) => {
    if (e.target.closest('.video-controls')) return;
    const newTab = window.open('', '_blank');
    newTab.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>企業網頁設計歷程 - 完整影片</title>
          <style>
            body,html{margin:0;height:100%;background:#000;display:flex;justify-content:center;align-items:center;}
            video{max-width:100%;max-height:100%;}
          </style>
        </head>
        <body>
          <video controls autoplay loop>
            <source src="${video.querySelector('source').src}" type="video/mp4">
          </video>
        </body>
      </html>
    `);
  });

  // 滑鼠移入顯示控制列
  let controlsTimeout;
  const showControls = () => {
    document.querySelector('.video-controls').style.opacity = '1';
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (!video.paused) {
        document.querySelector('.video-controls').style.opacity = '0';
      }
    }, 3000);
  };

  videoWrapper.addEventListener('mousemove', showControls);
  videoWrapper.addEventListener('mouseenter', showControls);
  videoWrapper.addEventListener('click', showControls);
});
