window.finalMovieJSON = {};

function start() {
    // body...
    var finalMovieJSON = window.finalMovieJSON;

    var movieJSON1 = {
        "The Shawshank Redemption": "http://www.omdbapi.com/?t=The%20Shawshank%20Redemption",
        "Zootopia": "http://www.omdbapi.com/?t=Zootopia",
        "The Godfather Series": ["http://www.omdbapi.com/?t=The%20Godfather", "http://www.omdbapi.com/?t=The Godfather: Part II", "http://www.omdbapi.com/?t=The%20Godfather:%20Part%20III"],
        "Gravity": "http://www.omdbapi.com/?t=Gravity",
        "Toy Story": ["http://www.omdbapi.com/?t=Toy%20Story", "http://www.omdbapi.com/?t=Toy%20Story%202", "http://www.omdbapi.com/?t=Toy%20Story%203"],
        "Inception": "http://www.omdbapi.com/?t=Inception",
        "Spirited Away": "http://www.omdbapi.com/?t=Spirited%20Away"
    };

    var movieJSON2 = {
        "The Shawshank Redemption": "http://www.omdbapi.com/?t=The%20Shawshank%20Redemption",
        "Zootopia": "http://www.omdbapi.com/?t=Zootopia",
        "The Godfather Series": "http://www.omdbapi.com/?t=The%20Godfather",
        "Gravity": "http://www.omdbapi.com/?t=Gravity",
        "Toy Story": "http://www.omdbapi.com/?t=Toy%20Story",
        "Inception": "http://www.omdbapi.com/?t=Inception",
        "Spirited Away": "http://www.omdbapi.com/?t=Spirit%ed%20Away"
    };

    function makeMovieJSON(movieJSON) {

        var sequence = Promise.resolve();

        for (let movie in movieJSON) {

            sequence = sequence.then(function() {

                var urlArray = [].concat(movieJSON[movie]);

                return getJSONFromArray(urlArray)
                
            })
            .then(function(movieDetailsArray){

                if (movieDetailsArray.length == 1) {
                    finalMovieJSON[movie] = movieDetailsArray[0];    
                }
                else
                {
                    finalMovieJSON[movie] = [].concat(movieDetailsArray);    
                }
                
            })
            .catch(function(err){

            });

        }

        return sequence;
    };

    

    function getJSONFromArray(movieArray) {

        return Promise.all(movieArray.map(getJSON));
    }

    function getJSON(url) {
        console.log(url);
        return fetch(url).then(function(response) {
            console.log(url);
            return response.json();
        }).then(function(rawMovieJSON){
            return makeFinalMoveObject(rawMovieJSON);
        });
    }

    function makeFinalMoveObject(movieDetail){


        return    {
            'Title' : movieDetail.Title,
            'Year' : movieDetail.Year,
            'Metascore' : movieDetail.Metascore,

            'IMDB' : {
                ID: movieDetail.imdbID,
                rating : movieDetail.imdbRating,
                votes : movieDetail.imdbVotes,
            },
            'summary' : movieDetail.Plot

        }
    };

    makeMovieJSON(movieJSON1).then(function() {
        
       console.log(window.finalMovieJSON);  



    });
};

start();