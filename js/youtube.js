/* 
    Documentation: https://rapidapi.com/h0p3rwe/api/youtube-search-and-download

    Originally was going to use the official Google API for YouTube,
    but it required a lot of session management and OAuth, so RapidAPI was easier

    Source: https://developers.google.com/youtube/v3/quickstart/js
*/

// Takes the text content of the search bar as a param, and passes it to the API
// Returns the results found with the search word
async function searchYoutube(searchRequest) {
    
    searchRequest = searchRequest.replace(' ', '%20');
    const url = `https://youtube-search-and-download.p.rapidapi.com/search?query=${searchRequest}&hl=en&gl=CA&type=v&duration=l&sort=r`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a4d5668f9msha7a1804dda02fffp178842jsn0baf52306b6f',
            'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
        }
    };

    try {
        fetch(url, options).then(response => {
            return response.json();
        }).then(json => parseResults(json, "search"))

    } catch (error) {
        console.error(error);
        return "Nothing found.";
    }
}

// Returns the top trending videos on YouTube
async function searchYoutubeTrending() {
    const url = 'https://youtube-search-and-download.p.rapidapi.com/trending?type=now&hl=en&gl=CA';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a4d5668f9msha7a1804dda02fffp178842jsn0baf52306b6f',
            'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
        }
    };

    try {
        fetch(url, options).then(response => {
            return response.json();
        }).then(json => parseResults(json, "trending"))
    } catch (error) {
        console.error(error);
        return "Nothing found.";
    }
}