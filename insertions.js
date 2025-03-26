// 🔹 Helper function to handle insertion of items (image, gif, video, etc.)
function insertInsertion(container, insertion) {
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("inserted", insertion.type);

    switch (insertion.type) {
        case "image":
        case "gif":
            createImageElement(imgContainer, insertion.src);
            break;
        case "vimeo":
            createVimeoElement(imgContainer, insertion.src);
            break;
        case "rive":
            createRiveElement(imgContainer, insertion.src);
            break;
        case "html":
            insertHTMLFile(imgContainer, insertion.src);
            break;
        case "mp4":
            insertMP4File(imgContainer, insertion.src);
            break;
        default:
            console.warn(`Unknown insertion type: ${insertion.type}`);
    }

    container.appendChild(imgContainer);
}

// 🔹 Helper function to create an image element
function createImageElement(container, src) {
    let img = document.createElement("img");
    img.src = src;
    img.alt = "Project Image";
    container.appendChild(img);
}

// 🔹 Helper function to create a Vimeo iframe
function createVimeoElement(container, vimeoUrl) {
    let vimeoId = vimeoUrl.split("/").pop();
    let iframe = document.createElement("iframe");
    iframe.src = `https://player.vimeo.com/video/${vimeoId}`;
    iframe.width = "640";
    iframe.height = "360";
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;
    container.appendChild(iframe);
}

// 🔹 Helper function for Rive animations (assuming Rive.js is loaded)
function createRiveElement(container, riveSrc) {
    let riveCanvas = document.createElement("canvas");
    riveCanvas.classList.add("rive-animation");
    container.appendChild(riveCanvas);

    // Assuming Rive.js is available globally
    new rive.Rive({
        src: riveSrc,
        canvas: riveCanvas,
        autoplay: true,
    });
}

// 🔹 Helper function for inserting HTML files
function insertHTMLFile(container, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
}

// 🔹 Helper function for inserting MP4 files
function insertMP4File(container, mp4Path) {
    let video = document.createElement("video");
    video.src = mp4Path;
    video.controls = true;
    container.appendChild(video);
}
