// DOM element constants
const searchButton = document.getElementById("search-button");
const trendingButton = document.getElementById("trending-button");
const studentNum = document.getElementById("student-num");
const userSearch = document.getElementById("user-search");
const searchResults = document.getElementById("search-results");
const trendingResults = document.getElementById("trending-results");

// Event listeners to call different API endpoints depending on the user's choice
searchButton.addEventListener("click", searchSubmit, false);
trendingButton.addEventListener("click", trendingSubmit, false);

// Prevents page refresh and displays name/student number
function eventHandling(event) {
    event.preventDefault();
    studentNum.textContent = "Emily Rose - 200553504";
}

function searchSubmit(event) {
    eventHandling(event);

    // The user must input something in the text box to call the API
    if (userSearch.value !== "" && userSearch.value !== null) 
    {
        searchYoutube(userSearch.value);
    }
}

function trendingSubmit(event) {
    eventHandling(event);
    searchYoutubeTrending();
}

// Handles displaying all API response information, regardless of the endpoint called
function parseResults(json, string) {

    // Remove the current response results from the endpoint used, if there are any
    if (string === "search")
    {
        while (searchResults.firstChild) {
            searchResults.removeChild(searchResults.firstChild);
        };
    }

    if (string === "trending")
    {
        while (trendingResults.firstChild) {
            trendingResults.removeChild(trendingResults.firstChild);
        };
    }

    // Display the first 3 results from the API response
    for (let i = 0; i < 3; i++) 
    {
        // Constant to track which response object to use
        const currentVideo = json.contents[i].video ;

        // Constants for necessary display elements
        const wrapper = document.createElement('div');
        const card = document.createElement('div');
        const title = document.createElement('h3');
        const thumnail = document.createElement('img');
        const channel = document.createElement('p');
        const length = document.createElement('p');
        const views = document.createElement('p');

        // Add the values from the response to the DOM elements
        wrapper.className = `${string}-results-wrapper`
        card.className = `${string}-results-card`
        title.textContent = currentVideo.title;
        thumnail.src = currentVideo.thumbnails[0].url;
        thumnail.alt = `Thumnail of ${currentVideo.title}`;
        channel.textContent = currentVideo.channelName;
        length.textContent = currentVideo.lengthText;
        views.textContent = currentVideo.viewCountText;

        // Combine all the elements together and add them to the index page
        card.appendChild(title);
        card.appendChild(thumnail);
        card.appendChild(channel);
        card.appendChild(length);
        card.appendChild(views);

        if (string === "search")
            searchResults.appendChild(wrapper).appendChild(card);
        if (string === "trending")
            trendingResults.appendChild(wrapper).appendChild(card);
    }
}