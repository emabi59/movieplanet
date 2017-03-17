$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        var seachstring = $('#searchString').val();
        getMovies(seachstring);
        e.preventDefault();
    })
});

function getMovies(seachstring) {
    axios.get('http://www.omdbapi.com?s=' + seachstring)
        .then((response) => {
            // console.log(response);
            let movies = response.data.Search;
            let output = "";
            $.each(movies, (index, movie) => {
                output += `
		      <div class="col-md-3">
                <div class="well text-center">
                  <img src="${movie.Poster}">
				  <h5>${movie.Title}</h5>
				  <a onclick="movieSelected('${movie.imdbID}')" class ="btn btn-primary " href="#">See Deatails</a>
                 </div>
			  </div>
		   `;
            });
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        })

}

// select  a specific movie base on movie id

function movieSelected(id) {
    sessionStorage.setItem("movieId", id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i=' + movieId)
        .then((response) => {
            let movie = response.data;
            let output = "";

            output += `
		       <div class="row">
                  <div class="col-md-4">
                 
                  <img src="${movie.Poster} class ="thumbnail">
				  </div>
				  <div class ="col-md-8">
                    <h5>${movie.Title}</h5>
                 <ul class = "list-group">
                     	<li class ="list-group-item">Genre:<strong>${movie.Genre}</strong></li>
					   <li class ="list-group-item">Released:<strong>${movie.Released}</strong></li>

						<li class ="list-group-item">Rated:<strong>${movie.Rated}</strong></li>

						<li class ="list-group-item">IMDB:<strong>${movie.imdbRating}</strong></li>

						<li class ="list-group-item">Dierector:<strong>${movie.Director}</strong></li>
                           <li class ="list-group-item">Writer:<strong>${movie.Writer}</strong></li>
						     <li class ="list-group-item">Actors:<strong>${movie.Actors}</strong></li>

						 </ul>
				  	</div>
			   		</div>
                   <div class= "row">
                       <div  class ="well">

                              <h3> Plot</h3>
							  ${movie.Plot}
							  <hr>
							  <a href = "http://imdb.com/title/${movie.imdbID}" target="blank" class =" btn btn-primary>View Imdb</a>
							  <a href ="index.hmtl" class ="btn btn-default">Go back To Search</a>				   </div>

				   </div>`;

            $('#movie').html(output);











        })
        .catch((err) => {
            console.log(err);
        });


}