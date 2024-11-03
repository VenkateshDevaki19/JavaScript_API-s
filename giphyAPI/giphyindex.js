const apikey = "yqUL28Uj3Dowt0phZQiLysX7ovSx5nEZ";
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const giphyContainer = document.getElementById('giphy-container');
const gifContainer = document.getElementById('gifs-container');
const stickerContainer = document.getElementById('stickers-container');
let timeout;

searchButton.addEventListener('click', () =>{
    const searchTerm = searchInput.value.trim();
    if(searchTerm){
        clearTimeout(timeout);
        timeout = setTimeout(() => fetchGifsAndStickers(searchTerm),300);
        // console.log(fetchGifsAndStickers(searchTerm));
    }else{
        alert('Please enter the text.')
    }
});


async function fetchGifsAndStickers(query){
    gifContainer.innerHTML =''; //empty the gif container if data exists
    stickerContainer.innerHTML = ''; //empty the sticker container if data exists

    try{
        const [gifsData, stickersData] = await Promise.all([
            fetchGiphyData('gifs', query),
            fetchGiphyData('stickers', query)
        ]);

        // console.log(gifsData);
        // console.log(stickersData);

        //Gifs Heading
        if(gifsData.data.length > 0){
            const gifHeading = document.createElement('h2');
            gifHeading.textContent = 'Gifs';
            gifContainer.appendChild(gifHeading);
        }

        //Stickers heading
        if(stickersData.data.length > 0){
            const stickerHeading = document.createElement('h2');
            stickerHeading.textContent = 'Stickers';
            stickerContainer.appendChild(stickerHeading);
        }
        displayData(gifsData.data, gifContainer, 'gif');
        displayData(stickersData.data, stickerContainer, 'sticker');
    }catch (error){
        console.log('Error Fetching GIFs or Stickers: ', error);
        alert('An error occurred while fetching data. Please try again later.');
    }
}

async function fetchGiphyData(type, query) {
    
    const response = await fetch(`https://api.giphy.com/v1/${type}/search?api_key=${apikey}&q=${query}&limit=20`)

    if(!response.ok){
        throw new Error("Network Response was not ok");
    }

    return await response.json();
}

function displayData(items, container, type){
    if(items.length === 0){
        const msg = document.createElement('p');
        msg.textContent = `No ${type} found. Please try a different search.`
        container.appendChild(msg);
    }else{
        items.forEach(item => {
            const imgElement = document.createElement('img');
            imgElement.src = item.images.fixed_height.url;

            imgElement.classList.add(type);
            container.appendChild(imgElement);
        });
    }
}

/*
async function fetchGifsAndStickers(query){
     try{
         //fetching gifs
        const gifsResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${query}&limit=15`);
        const gifsData = await gifsResponse.json();
        // console.log(gifsData);
        displayGifs(gifsData.data, 'gif');

        // fetching stickers
        const stickersResponse = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=${apikey}&q=${query}&limit=15`);
        const stickersData = await stickersResponse.json();
        console.log(stickersData);
        displayGifs(stickersData.data, 'sticker');
     }catch (error){
        console.log('Error Fetching GIFs or Stickers: ', error);
     }
}


function displayGifs(items, type){

    giphyContainer.innerHTML = '';

    items.forEach(item => {
        const imgElement = document.createElement('img');
        imgElement.src = type ==='gif' ? item.images.fixed_height.url : item.images.fixed_height.url;

        imgElement.classList.add(type);
        giphyContainer.appendChild(imgElement);
    });
}

*/

