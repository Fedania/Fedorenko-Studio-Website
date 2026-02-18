// Helper to create the block structure
function createBlockWrapper(type, block) {
  const wrapper = document.createElement("div");
  // "block" is the shared class, type is the specific class
  wrapper.className = `block ${type}`;
  if (block.class) wrapper.classList.add(...block.class.split(" "));

  const outer = document.createElement("div");
  outer.className = "block-wrapper";
  outer.appendChild(wrapper);

  return { outer, wrapper };
}

export function renderHeading(block, container) {
  const { outer, wrapper } = createBlockWrapper("text", block);
  const el = document.createElement("h5");
  el.textContent = block.value;
  wrapper.appendChild(el);
  container.appendChild(outer);
}

export function renderText(block, container) {
  const { outer, wrapper } = createBlockWrapper("text", block);

  const el = document.createElement("div"); 
  // use div instead of p because markdown may contain multiple elements

  el.innerHTML = marked.parse(block.value);

  wrapper.appendChild(el);
  container.appendChild(outer);
}

export function renderImage(block, container, projectID) {
  const { outer, wrapper } = createBlockWrapper("img", block);
  const img = document.createElement("img");
  img.src = `/images/${projectID}/${block.value}`;
  img.alt = block.alt || "";
  wrapper.appendChild(img);
  container.appendChild(outer);
}

export function renderImageRow(block, container, projectID) {
  const { outer, wrapper } = createBlockWrapper("img-row", block);

  block.value.forEach((fileName, i) => {
    const img = document.createElement("img");
    img.src = `/images/${projectID}/${fileName}`;
    img.alt = block.alt ? block.alt[i] || "" : "";
    wrapper.appendChild(img);
  });

  if (block.caption) {
    const cap = document.createElement("div");
    cap.classList.add("caption");
    cap.textContent = block.caption;
    wrapper.appendChild(cap);
  }

  container.appendChild(outer);
}

export function renderGif(block, container, projectID) {
  const { outer, wrapper } = createBlockWrapper("gif", block);
  const img = document.createElement("img");
  img.src = `/images/${projectID}/${block.value}`;
  img.alt = block.alt || "";
  wrapper.appendChild(img);
  container.appendChild(outer);
}

export function renderVideo(block, container, projectID) {
  const { outer, wrapper } = createBlockWrapper("video", block);
  const video = document.createElement("video");
  video.src = `/images/${projectID}/${block.value}`;
  
  if (block.poster) video.poster = `/images/${projectID}/${block.poster}`;
  if (block.autoplay) video.autoplay = true;
  if (block.loop) video.loop = true;
  if (block.muted) video.muted = true;
  if (block.controls !== false) video.controls = true;

  wrapper.appendChild(video);
  container.appendChild(outer);
}

export function renderSpacer(block, container) {
  const el = document.createElement("div");
  el.className = `spacer ${block.size || "medium"}`;
  container.appendChild(el);
}

export async function renderHTML(block, container, projectID) {
  const { outer, wrapper } = createBlockWrapper("html", block);

  const response = await fetch(`/images/${projectID}/${block.value}`);
  const html = await response.text();

  const host = document.createElement("div");
  host.className = "html-insert";
  if (block.class) host.classList.add(block.class);

  host.innerHTML = html;

  wrapper.appendChild(host);
  container.appendChild(outer);
}