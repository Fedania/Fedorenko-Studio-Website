// loadProjectImages.js
console.log("loadProjectImages.js loaded");
import { insertInsertion, createImageElement} from './insertions.js';

// 🔹 NEW: Load images and handle insertions
export async function loadProjectImages(projectId, project) {
    const projectGallery = document.querySelector(".project-page__gallery");
    // 🔹 Apply project-wide class if specified
    if (project.class) {
        projectGallery.classList.add(project.class);
    }

    let imgIndex = 1;
    let imageFolder = `../images/${projectId}/`;
    const captions = project.captions || [];
    const insertions = project.insertions || [];

    // Map captions for quick lookup
    const captionMap = new Map();
    captions.forEach((caption, index) => captionMap.set(index + 1, caption)); // Map caption by index

    // Track inserted indexes to avoid duplication
    const insertedIndexes = new Set();

    // Insert any initial items before the rows start (if there are insertions at the start)
    if (insertions.length > 0) {
        insertions.filter(ins => ins.index === 0).forEach(insertion => {
            if (!insertedIndexes.has(insertion.index)) {
                insertInsertion(projectGallery, insertion); // Insert initial items
                insertedIndexes.add(insertion.index); // Mark as inserted
            }
        });
    }

   // Add images and insertions between them
project.layout.forEach(rowCount => {
    let row = document.createElement("div");
    row.classList.add("gallery__image-row");

    for (let i = 0; i < rowCount; i++) {
        let imgContainer = document.createElement("div");

        // Check for insertion before the current image
        let insertedItem = insertions.find(ins => ins.index === imgIndex);
        if (insertedItem && !insertedIndexes.has(imgIndex)) {
            imgContainer.classList.add("gallery__inserted", insertedItem.type); // Assign type as class
            insertInsertion(imgContainer, insertedItem);
            insertedIndexes.add(imgIndex);
        } else {
            imgContainer.classList.add("gallery__image");
            let imgSrc = `${imageFolder}${projectId}-${String(imgIndex).padStart(2, '0')}.jpg`;

            let img = document.createElement("img");
            img.src = imgSrc;
            img.loading = "lazy";

            img.onerror = () => {
                img.onerror = null;
                img.src = "../assets/placeholder.jpg";
            };

            imgContainer.appendChild(img);

        }

        row.appendChild(imgContainer);
        

        // 🔹 Check if there's a caption **after** this image
        let captionObj = captions.find(caption => caption.index === imgIndex);
        if (captionObj) {
            let caption = document.createElement("p");
            caption.classList.add("gallery__caption");
            caption.textContent = captionObj.text;
            
            let captionWrapper = document.createElement("div");
            captionWrapper.classList.add("gallery__caption-wrapper"); // For styling if needed
            captionWrapper.appendChild(caption);
            
            projectGallery.appendChild(captionWrapper); // Add caption *after* row
        }
        projectGallery.appendChild(row);
        imgIndex++;
    }



        // After each row, check for any insertions
        insertions.filter(ins => ins.index === imgIndex).forEach(insertion => {
            if (!insertedIndexes.has(insertion.index)) {
                insertInsertion(projectGallery, insertion); // Insert items after the row
                insertedIndexes.add(insertion.index); // Mark as inserted
            }
        });
    });
    
}
