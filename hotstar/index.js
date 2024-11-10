const imageContainer = document.querySelector(".profilePhoto");
const image = document.querySelector(".defaultPhoto");
const fileInput = document.querySelector(".uploadFile");

imageContainer.addEventListener('click', () =>{
    fileInput.click(); //trigger the file input click event
});

fileInput.addEventListener('change', (e) =>{
    const selectedFile = e.target.files[0];
    if(selectedFile){
        image.src = URL.createObjectURL(selectedFile);
        console.log('Selected File: ',selectedFile.name);
    }
}); 


let slideShowArray = [
    "https://image-resizer-cloud-api.akamaized.net/image/F1DE08EE-79B3-44CC-90D9-0303FE935BCC/0-3x1.jpg?width=1800&updatedTime=2024-08-30T14:33:20Z&dt=Web",
    "https://image-resizer-cloud-api.akamaized.net/image/3D24C9D0-A513-488B-9CAF-50D4BF2D13C3/0-3x1.jpg?width=1800&updatedTime=2024-08-30T14:37:12Z&dt=Web",
    "https://image-resizer-cloud-api.akamaized.net/image/2CD58353-24C9-4F51-9279-C8E1746D5C1F/0-3x1.jpg?width=1800&updatedTime=2024-08-31T12:12:14Z&dt=Web",
    "https://image-resizer-cloud-api.akamaized.net/image/3E153C8E-8C6E-47E9-8697-79644726744B/0-3x1.jpg?width=1800&updatedTime=2024-10-01T12:02:10Z&dt=Web"
];

function slideShow(){
    let i=0;
    let divCorousel = document.getElementById("carsouel");
    let imgCarsouel = document.createElement("img");
    imgCarsouel.src = slideShowArray[0];

    divCorousel.append(imgCarsouel);

    // console.log(divCorousel);

    setInterval(function(){
        if( i== slideShowArray.length){
            i=0;
        }

        imgCarsouel.src = slideShowArray[i];
        i = i+1;
        // console.log(slideShowArray);
    }, 1500);
}

slideShow();


const movies = [
      {
        name: "RRR",
        rating: 8,
        img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/7642/1307642-v-3d3b6c61f97e",
        year: "2022",
        genre: "Action",
        director: "S. S. Rajamouli",
        imdbRating: 8.2,
        actors: "N. T. Rama Rao Jr., Ram Charan"
      },
      {
        name: "Goodluck Jerry",
        rating: 7,
        img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/901/1310901-v-e9763c24f44d",
        year: "2022",
        genre: "Comedy",
        director: "Sidharth Sengupta",
        imdbRating: 7.2,
        actors: "Janvi Kapoor, Deepak Dobriyal"
      },
      {
        name: "MSD",
        rating: 8.5,
        img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/old_images/vertical/MOVIE/3314/1770003314/1770003314-v",
      },
      {
        name: "Doctor Strange",
        rating: 9,
        img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/9948/1279948-v-cc9471178e40",
      },
      {
        name: "Ford vs Ferrari",
        rating: 8.7,
        img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/3150/813150-v",
      },
      {
        name: "Masaan",
        rating: 8.8,
        img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/old_images/vertical/MOVIE/7441/1000087441/1000087441-v",
      },
      {
        name: "The lion king",
        rating: 8.4,
        img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/5242/875242-v",
      },
      {
        name: "Inception",
        rating: 8.8,
        img: "https://static.toiimg.com/photo/msid-6177430/6177430.jpg?57181"
      },
      {
        name: "Avengers: Endgame",
        rating: 9.1,
        img: "https://i.pinimg.com/originals/5a/76/40/5a76400387c41fee60ca8a87f56dda33.jpg"
      },
];

let currentIndex = 0;
const moviesPerPage = 5;

function appendMovies(data){
    let data_div = document.getElementById("basic");

    data_div.innerHTML="";

    data.forEach(function (element){
        let div = document.createElement('div');

        // let paragraphName = document.createElement('p');
        // paragraphName.innerHTML = `Name: ${element.name}`;

        // let paragraphRating = document.createElement('p');
        // paragraphRating.innerHTML = `Rating: ${element.rating}`;

        let uploadImage = document.createElement('img');
        uploadImage.src = element.img;
        uploadImage.id="poster";

        // Create a div for the overlay
        let overlayDiv = document.createElement('div');
        overlayDiv.classList.add('overlay');

        // Adding movie details to the overlay
        overlayDiv.innerHTML = `
            <h3>${element.name}</h3>
            <p>Year: ${element.year}</p>
            <p>Genre: ${element.genre}</p>
            <p>Director: ${element.director}</p>
            <p>IMDb Rating: ${element.imdbRating}</p>
            <p>Actors: ${element.actors}</p>
        `;

        div.append(uploadImage,overlayDiv);

        // div.append(uploadImage,paragraphRating,paragraphName);

        data_div.append(div);

        // console.log(data_div);
    });
}


let myPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let data = movies;

    if (data != null) {
      resolve(data);
    } else {
      reject("Err: server could not send data");
    }
  }, 3000);
});

async function main() {
    try{
      document.getElementById('loading').style.display = 'block';
      let response = await myPromise;
      appendMovies(response);
    }
    catch(error){
        console.log("error:", error);
        document.getElementById('loading').style.display = 'none';
    }
}


// function to filter the movies

function filterMovies(){
  const ratingFilter = document.getElementById('ratingFilter').value;
  const filteredMovies = [...movies];

  console.log("Selected Filter: ", ratingFilter);

  if(ratingFilter === "LtoH"){
    filteredMovies.sort((x,y) => x.rating-y.rating);
  }else if(ratingFilter === "HtoL"){
    filteredMovies.sort((x,y) => y.rating-x.rating);
  }

  console.log("Filter Movies: ", filteredMovies);
  appendMovies(filteredMovies); //re-render the filter list
}

//Event listener for the rating filter
document.getElementById('ratingFilter').addEventListener('change',filterMovies);

main();

// OMDB Functionality to display movies in the page 

document.getElementById("searchButton").addEventListener('click', searchMovies);

async function searchMovies(){

  const searchQuery = document.getElementById("searchInput").value;

  showOverlay();

  if(searchQuery){
    try{
      const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=ec4e3c87`);
      const data = await response.json();
      console.log(data);
      if(data.Response ==="True"){
        displayRandomMovies(data.Search);
      }else{
        alert("Movie not found. try another search.");
      }
    }catch(error){
      console.error("Error fetching data from OMDb API:", error);
    }

  }else{
    alert("Please enter a movie name.");
  }

  hideOverlay();
}

function showOverlay(){
  document.getElementById('loading').style.display = "flex";
}

function hideOverlay(){
  document.getElementById('loading').style.display = "none";
}

//function to display random movies
function displayRandomMovies(movies){

  const moviesContainer = document.getElementById("basic");
  moviesContainer.innerHTML="";

  const randomMovies = movies.sort(() => 0.5 - Math.random()).slice(0,15);

  randomMovies.forEach((movie) =>{
    const movieDiv = document.createElement("div");

    const moviePoster = document.createElement("img");
    moviePoster.src = movie.Poster !=="N/A" ?movie.Poster :  "https://via.placeholder.com/150";
    moviePoster.alt = movie.Title

    const movieTitle = document.createElement("p");
    movieTitle.textContent = `Title: ${movie.Title}`;


    const movieYear = document.createElement("p");
    movieYear.textContent = `Year: ${movie.Year}`;

    movieDiv.append(moviePoster,movieTitle,movieYear);
    moviesContainer.append(movieDiv);
  });
}