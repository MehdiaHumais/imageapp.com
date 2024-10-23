const accessKey = 'b4TZV_sdPC9vJnL2No-FNP1dy_xUapsefuBquKu788M';
const searchForm = document.querySelector('form');
const imagesInput = document.querySelector('.search-input'); // یہ یقینی بنائیں کہ آپ کی HTML میں '.search-input' موجود ہو
const imagesContainer = document.querySelector('.images-container');

// fetchImage فنکشن
const fetchImage = async (query) => {
    imagesContainer.innerHTML = '';  // پچھلے نتائج صاف کریں
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // اگر کوئ نتائج نہ ہوں
        if (data.results.length === 0) {
            imagesContainer.innerHTML = `<h2>No results found</h2>`;
            return;
        }

        // ہر تصویر کے لیے ایک div بنائیں
        data.results.forEach(photo => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv');
            imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description || 'Image'}">`;

            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');

            // overlay پر ٹیکسٹ بنائیں
            const overlayText = document.createElement('h3');
            overlayText.innerText = photo.alt_description || 'No description available';

            overlayElement.appendChild(overlayText);
            imageElement.appendChild(overlayElement);

            imagesContainer.appendChild(imageElement);
        });

    } catch (error) {
        imagesContainer.innerHTML = `<h2>Error fetching images. Please try again later.</h2>`;
    }
}

// فارم سبمٹ کرنے کا ایونٹ سننا
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const inputText = imagesInput.value.trim();
    if (inputText !== '') {
        fetchImage(inputText);
    } else {
        imagesContainer.innerHTML = `<h2>Please enter a search query</h2>`;
    }
});
