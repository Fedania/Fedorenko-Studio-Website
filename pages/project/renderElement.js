
export function renderHeading(block, container) {
  const el = document.createElement("h2");
  el.textContent = block.value;
  if (block.class) el.className = block.class;
  container.appendChild(el);
}

export function renderText(block, container) {
  const el = document.createElement("p");
  el.textContent = block.value;
  if (block.class) el.className = block.class;
  container.appendChild(el);
}

export function renderImage(block, container, projectID) {
  const img = document.createElement("img");
  img.src = `/images/${projectID}/${block.value}`;
  img.alt = block.alt || "";

  const wrapper = document.createElement("div");
  wrapper.className = "block img-block";
  if (block.class) wrapper.classList.add(...block.class.split(" "));

  wrapper.appendChild(img);
  container.appendChild(wrapper);
}
export function renderImageRow(block, container, projectID) {
  const row = document.createElement("div");
  row.className = "block img-row";
  if (block.class) row.classList.add(...block.class.split(" "));

  block.value.forEach((fileName, i) => {
    const img = document.createElement("img");
    img.src = `/images/${projectID}/${fileName}`;
    img.alt = block.alt ? block.alt[i] || "" : "";
    row.appendChild(img);
  });

  if (block.caption) {
    const cap = document.createElement("div");
    cap.classList.add("caption");
    cap.textContent = block.caption;
    row.appendChild(cap);
  }

  container.appendChild(row);
}
export function renderGif(block, container, projectID) {
  const img = document.createElement("img");
  img.src = `/images/${projectID}/${block.value}`;
  img.alt = block.alt || "";

  const wrapper = document.createElement("div");
  wrapper.className = "block gif-block";
  if (block.class) wrapper.classList.add(...block.class.split(" "));

  wrapper.appendChild(img);
  container.appendChild(wrapper);
}
export function renderVideo(block, container, projectID) {
  const video = document.createElement("video");
  video.src = `/images/${projectID}/${block.value}`;

  if (block.poster)
    video.poster = `/images/${projectID}/${block.poster}`;

  if (block.autoplay) video.autoplay = true;
  if (block.loop) video.loop = true;
  if (block.muted) video.muted = true;
  if (block.controls !== false) video.controls = true;

  const wrapper = document.createElement("div");
  wrapper.className = "block video-block";
  if (block.class) wrapper.classList.add(...block.class.split(" "));

  wrapper.appendChild(video);
  container.appendChild(wrapper);
}
export function renderSpacer(block, container) {
  const el = document.createElement("div");
  el.className = `spacer ${block.size || "medium"}`;
  container.appendChild(el);
}
