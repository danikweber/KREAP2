//
// ARE.NA bloky od nejstarších (používám u excerpts z knížek)
//

function fetchArenaData(apiUrl) {
    axios.get(apiUrl)
        .then(response => {
            console.log(response.data);  // Check the API response
            displayContent(response.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function displayContent(data) {
    const contentContainer = document.getElementById('content-collection');
    let blocks = data.contents;  // Based on Are.na API structure


    blocks.forEach(block => {
        const blockElement = document.createElement('div'); // Create a container for each block

        // Add a class to the block element
        blockElement.className = `block-${block.class.toLowerCase()}`;

        // Check block type and handle accordingly
        if (block.class === 'Image') {
            const imgElement = document.createElement('img');
            imgElement.className = `arena`;
            imgElement.src = block.image.display.url;
            imgElement.alt = block.title || "Image from Are.na collection";
            blockElement.appendChild(imgElement);
        } else if (block.class === 'Text') {
            if (block.title) {
                const containerElement = document.createElement('div');
                containerElement.className = `block-text-container`;

                const textElement = document.createElement('p');
                //console.log(block.content);
                textElement.textContent = block.content;

                const altTextElement = document.createElement('p');
                altTextElement.textContent = block.title || "";
                altTextElement.className = `arena__title`;

                blockElement.appendChild(containerElement);
                containerElement.appendChild(textElement);
                blockElement.appendChild(altTextElement);
            }
            else {
                const containerElement = document.createElement('div');
                containerElement.className = `block-text-container`;

                const textElement = document.createElement('p');
                //console.log(block.content);
                textElement.textContent = block.content;

                blockElement.appendChild(containerElement);
                containerElement.appendChild(textElement);
            }
            
            
          
           
        } else if (block.class === 'Link') {
            const linkUrl = block.source.url;

            if (block.image && block.image.display && block.image.display.url) {
                const linkElement = document.createElement('a');
                linkElement.href = linkUrl;
                linkElement.target = "_blank"; // Open link in a new tab

                const imgElement = document.createElement('img');
                imgElement.src = block.image.display.url;
                imgElement.className = `arena__link`;
                imgElement.alt = block.title || "Image for link from Are.na";
                imgElement.style.maxWidth = '100%'; // Optional: Adjust the size of the image

                const altTextElement = document.createElement('p');
                altTextElement.textContent = block.title || "No description available";
                altTextElement.className = `arena__link`;

                linkElement.appendChild(imgElement);
                blockElement.appendChild(linkElement);
                blockElement.appendChild(altTextElement);
            } else {
                const linkElement = document.createElement('a');
                linkElement.href = linkUrl;
                linkElement.textContent = block.title || linkUrl;
                linkElement.target = "_blank"; // Open link in a new tab
                blockElement.appendChild(linkElement);
            }
        }

        contentContainer.appendChild(blockElement);
    });
}
