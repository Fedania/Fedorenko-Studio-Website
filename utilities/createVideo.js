export function createVideo(options = {}) {
  const {
    container,              // REQUIRED: DOM element or selector
    id = null,              // optional id
    className = "",

    src,
    sources = [],           // [{ src, type }]
    poster = "",

    autoplay = true,
    loop = true,
    muted = true,
    controls = false,
    playsInline = true,

    playbackRate = 1,

    preload = "auto",

    attributes = {},        // extra attributes (data-*, etc.)
    onInit = null           // callback(video)
  } = options;

  // 🔎 Resolve container
  const containerEl =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!containerEl) {
    console.warn(`Container not found:`, container);
    return null;
  }

  // 🔎 Try to reuse existing video
  let video = id
    ? containerEl.querySelector(`#${id}`)
    : containerEl.querySelector("video");

  if (!video) {
    video = document.createElement("video");

    if (id) video.id = id;
    if (className) video.className = className;

    containerEl.appendChild(video);
  }

  // 🎬 Sources
  if (sources.length > 0) {
    video.innerHTML = ""; // clear existing <source>

    sources.forEach(({ src, type }) => {
      const sourceEl = document.createElement("source");
      sourceEl.src = src;
      if (type) sourceEl.type = type;
      video.appendChild(sourceEl);
    });
  } else if (src) {
    video.src = src;
  }

  // ⚙️ Basic props
  video.autoplay = autoplay;
  video.loop = loop;
  video.muted = muted;
  video.controls = controls;
  video.playsInline = playsInline;
  video.preload = preload;

  if (poster) video.poster = poster;

  // 🎚 Playback
  video.playbackRate = playbackRate;

  // 🧩 Extra attributes
  Object.entries(attributes).forEach(([key, value]) => {
    video.setAttribute(key, value);
  });

  // ▶️ Try to play
  if (autoplay) {
    video.play().catch(err =>
      console.warn("Video autoplay failed:", err)
    );
  }

  // 🪝 Hook
  if (onInit && typeof onInit === "function") {
    onInit(video);
  }

  return video;
}