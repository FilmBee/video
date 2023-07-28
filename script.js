// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = videojs("video-player");

  // Function to load a video URL
  function loadVideo(url) {
    const videoSource = {
      src: url,
      type: "video/mp4", // Change this based on the video formats you want to support
    };

    videoPlayer.src(videoSource);
    videoPlayer.load();
  }

  // Handle form submission to load the video
  const videoForm = document.getElementById("video-form");
  videoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const videoURL = document.getElementById("video-url").value;
    loadVideo(videoURL);
  });
});
