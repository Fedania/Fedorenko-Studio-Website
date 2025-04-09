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
            createRiveElement(imgContainer, insertion.src, insertion.artboard, insertion.stateMachine);
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

// 🔹 Simple helper to embed responsive Rive animation
function createRiveElement(container, riveSrc, artboard, stateMachine) {
    // Create wrapper div to handle aspect ratio and centering
    const wrapper = document.createElement("div");
    wrapper.classList.add("rive-wrapper");

    // Create canvas inside the wrapper
    const riveCanvas = document.createElement("canvas");
    riveCanvas.classList.add("rive-animation");

    wrapper.appendChild(riveCanvas);
    container.appendChild(wrapper); // <div class="inserted rive"> is the container

    // Stretch to 100% width like an <img>
    riveCanvas.style.width = "100%";
    riveCanvas.style.height = "auto";
    riveCanvas.style.display = "block";

    // High-DPI support
    const resizeCanvas = () => {
        const rect = wrapper.getBoundingClientRect();
        riveCanvas.width = rect.width * window.devicePixelRatio;
        riveCanvas.height = rect.height * window.devicePixelRatio;
        riveInstance.resizeDrawingSurfaceToCanvas();
    };

    // Create Rive instance
    const riveInstance = new rive.Rive({
        src: riveSrc,
        canvas: riveCanvas,
        autoplay: true,
        layout: new rive.Layout({
            fit: rive.Fit.Contain,     // Contain within canvas, preserve aspect
            alignment: rive.Alignment.Center
        }),
        artboard: artboard || undefined,
        stateMachines: stateMachine ? [stateMachine] : [],
        onLoad: () => {
            resizeCanvas();
        }
    });

    window.addEventListener("resize", resizeCanvas);
}




// 🔹 Helper function for inserting HTML files
function insertHTMLFile(container, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;

            // Re-execute any scripts in the inserted HTML
            const scripts = container.querySelectorAll("script");
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");

                if (oldScript.src) {
                    // External script
                    newScript.src = oldScript.src;
                } else {
                    // Inline script
                    newScript.textContent = oldScript.textContent;
                }

                // Copy attributes (like type)
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });

                oldScript.replaceWith(newScript);
            });
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
