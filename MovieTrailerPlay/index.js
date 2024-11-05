const movieContainers = document.querySelectorAll(".movie-container");

movieContainers.forEach(container =>{
    const movieTrailer = container.querySelector('.movie-trailer');
    const movieInfo = container.querySelector('.movie-info');
    const movieDetails = container.querySelector('.movie-details');

    let hideDetailsTimeout;

    container.addEventListener('mouseover', () =>{
        movieTrailer.play(); //play video on hover

        movieInfo.style.display = 'block';//display movie info immediately

        hideDetailsTimeout = setTimeout(()=>{
            movieDetails.classList.add('disappear');
        },3000);
    });

    container.addEventListener('mouseleave', () =>{
        movieTrailer.pause();// pause video when hover ends
        movieTrailer.currentTime=0; // reset the video start

        movieInfo.style.display = 'none';

        clearTimeout(hideDetailsTimeout);

        movieDetails.classList.remove('disappear');
    });
});