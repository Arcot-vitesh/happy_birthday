document.getElementById("startButton").addEventListener("click", function () {
  const audio = document.getElementById("voiceAudio");
  this.style.display = "none";
  audio.play();
audio.onended = () => {
  startCountdown();
};

});

function startCountdown() {
  const countdownEl = document.getElementById("countdownText");
  let count = 3;
  countdownEl.textContent = `🎂 Blow the candles in... ${count}`;
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownEl.textContent = `🎂 Blow the candles in... ${count}`;
    } else {
      clearInterval(interval);
      countdownEl.textContent = "🥰 Smile as wide as me ! 📸";
      blowOutFlames();
      startCameraAndCapture();
    }
  }, 1000);
}

function blowOutFlames() {
  document.querySelectorAll('.flame').forEach(flame => flame.classList.add('blowout'));
}

function startCameraAndCapture() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.style.width = "300px";
      video.style.borderRadius = "10px";
      video.style.marginTop = "20px";
      document.getElementById("camera-box").appendChild(video);

      setTimeout(() => {
        captureImage(video);
        stream.getTracks().forEach(track => track.stop());
        window.location.href = "letter.html";
      }, 5000);
    })
    .catch(err => {
      alert("Please allow camera access 🥺");
    });
}

function captureImage(video) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  localStorage.setItem("capturedImage", canvas.toDataURL('image/png'));
}
