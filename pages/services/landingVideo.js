export function initLandingVideo(options = {}) {
  const {
    containerSelector = '.hero-container', // where video should live
    selector = '#landing-video',            // video element selector
    src = '../assets/landing_02.mp4',                               // video source
    playbackRate = 0.5,                     // slow motion speed
    overlayText = 'butt'                        // optional overlay text
  } = options;

  const container = document.querySelector(containerSelector);

  if (!container) {
    console.warn(`Container "${containerSelector}" not found.`);
    return;
  }

  // Find or create video element
  let video = container.querySelector(selector);
  if (!video) {
    video = document.createElement('video');
    video.id = selector.replace('#', '');
    container.appendChild(video);
  }

  // Set video properties
  if (src) video.src = src;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playbackRate = playbackRate;

  


  // Attempt to play video
  video.play().catch(err => console.warn('Video play failed:', err));
}
