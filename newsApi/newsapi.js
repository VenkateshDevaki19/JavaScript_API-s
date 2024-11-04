const apikey = 'cbad13c4cf334382a7b4bb1589e8b90a';
const newsContainer = document.getElementById('news-container');

function showLoading(){
    document.getElementById('loading').style.display = 'block';
}

function hideLoading(){
    document.getElementById('loading').style.display = 'none';
}

//query ='', category = '', country='us'
async function fetchNews(query ='', category = '', country='us'){
    showLoading(); //show loading indicator

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&q=${query}&apiKey=${apikey}`;

    // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    hideLoading(); //hide loading indicator
    displayNews(data.articles);
}

function displayNews(articles){
    newsContainer.innerHTML='';
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.innerHTML= `
            <h2>${article.title}</h2>
            <p>${article.description || 'No description available.'}</p>
            <a href = "${article.url}" target="_blank">Read More</a>
        `;

        newsContainer.appendChild(newsCard);
    });
}

// debounce function

function debounce(func, delay){
    let timeoutId;

    return function(...args){
        if(timeoutId){
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        },delay);
    };
}

const debouncedFetchNews = debounce(fetchNews, 300);

document.getElementById('search-input').addEventListener('input', (event) =>{
    const query = event.target.value;

    const category = document.getElementById('category-select').value;
    const country = document.getElementById('country-select').value;

    if(query){
        debouncedFetchNews(query,category,country);
    }else{
        fetchNews('', category,country); //fetch all news id search input is empty
    }
});


document.getElementById('category-select').addEventListener('change', (event) =>{
    const query = event.target.value;
    const category = document.getElementById('category-select').value;
    const country = document.getElementById('country-select').value;

    fetchNews(query,category,country);
});


document.getElementById('country-select').addEventListener('change', (event) =>{
    const query = event.target.value;
    const category = document.getElementById('category-select').value;
    const country = document.getElementById('country-select').value;

    fetchNews(query,category,country);
});

fetchNews();
// fetchNews('','','in');
