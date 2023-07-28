document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = videojs("video-player");

  function loadVideo(url) {
    const videoSource = {
      src: url,
      type: "video/mp4", // Change this based on the video formats you want to support
    };

    videoPlayer.src(videoSource);
    videoPlayer.load();
  }

  // Function to load and display available audio tracks
  function loadAudioTracks() {
    const audioTracks = videoPlayer.audioTracks();
    const optionsContainer = document.getElementById("audio-tracks");

    optionsContainer.innerHTML = ""; // Clear existing options

    for (let i = 0; i < audioTracks.length; i++) {
      const track = audioTracks[i];
      const option = document.createElement("option");
      option.value = i;
      option.textContent = track.label || `Audio ${i + 1}`;
      optionsContainer.appendChild(option);
    }
  }

  // Function to load and display available subtitle tracks
  function loadSubtitleTracks() {
    const subtitleTracks = videoPlayer.textTracks();
    const optionsContainer = document.getElementById("subtitle-tracks");

    optionsContainer.innerHTML = ""; // Clear existing options

    for (let i = 0; i < subtitleTracks.length; i++) {
      const track = subtitleTracks[i];
      if (track.kind === "subtitles") {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = track.label || `Subtitle ${i + 1}`;
        optionsContainer.appendChild(option);
      }
    }
  }

  // Function to handle audio track change
  function handleAudioTrackChange() {
    const selectedAudioIndex = parseInt(
      document.getElementById("audio-tracks").value
    );
    const audioTracks = videoPlayer.audioTracks();
    for (let i = 0; i < audioTracks.length; i++) {
      audioTracks[i].enabled = i === selectedAudioIndex;
    }
  }

  // Function to handle subtitle track change
  function handleSubtitleTrackChange() {
    const selectedSubtitleIndex = parseInt(
      document.getElementById("subtitle-tracks").value
    );
    const subtitleTracks = videoPlayer.textTracks();
    for (let i = 0; i < subtitleTracks.length; i++) {
      const track = subtitleTracks[i];
      if (track.kind === "subtitles") {
        track.mode = i === selectedSubtitleIndex ? "showing" : "hidden";
      }
    }
  }

  // Wait for the video player to be ready before setting up tracks
  videoPlayer.ready(function () {
    loadAudioTracks();
    loadSubtitleTracks();

    // Handle audio track change event
    document.getElementById("audio-tracks").addEventListener("change", function () {
      handleAudioTrackChange();
    });

    // Handle subtitle track change event
    document.getElementById("subtitle-tracks").addEventListener("change", function () {
      handleSubtitleTrackChange();
    });
  });

  // Handle form submission to load the video
  const videoForm = document.getElementById("video-form");
  videoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const videoURL = document.getElementById("video-url").value;
    loadVideo(videoURL);
    loadAudioTracks();
    loadSubtitleTracks();
  });
});
