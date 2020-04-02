const API_KEY = "AIzaSyBr9aZS8zfy4_VlhghpZ_CSSN6dNqHMxSg"
function fetchSearch( searchMade, pageStatus)
{
    'https://www.googleapis.com/youtube/v3/search?part=snippet&q=dogs&key=[YOUR_API_KEY]'

      let url
      if(pageStatus ==  "firstSearch")
      {
          url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchMade}&key=${API_KEY}`; 
      }
      else
      {
            url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchMade}&key=${API_KEY}&pageToken=${pageStatus}`;
      }
      
    let settings = {
        method : 'GET'
    };

    console.log(url); 
    
    fetch(url, settings).then(response => {
        if(response.ok)
        {
            return response.json(); 
        }
        throw new Error (response.statusText); 
    }).then(responseJSON => {
        displayResults(responseJSON, searchMade); 
    }).catch(err => {
        console.log(err); 
    }); 
}

function displayResults(data, searchMade){
    let results = document.querySelector('.results')
    results.innerHTML = ""; 

    for(let i = 0; i < data.items.length;  i ++){

        console.log(data.items[i].snippet.thumbnails.default.url);
        console.log(data.items[i].snippet.thumbnails.default.width);
        console.log(data.items[i].snippet.thumbnails.default.height);

        results.innerHTML += 
        `
        <li>
        <div class = "mainDiv clickable"> 

        <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank">
            <h3 class ="clickable"> 
            ${data.items[i].snippet.title}
            </h3>
        </a>
             <div>
             <a href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" target="_blank" >
                 <img src=${data.items[i].snippet.thumbnails.default.url} alt="Here goes the thumbnail of the youtube video" class ="clickable"
                 style="width:${data.items[i].snippet.thumbnails.default.width}px;height:${data.items[i].snippet.thumbnails.default.height}px;">
             </a>    
             </div> 

        </div> 
        </li>    
        `; 
    }

    document.querySelector('.buttonsSection').innerHTML =  
        `
        <div>
        <button class = "prevBttn">Previous</button>
        <button class="nextBttn">Next</button>
      </div>
        `;

    let nextToken = data.nextPageToken;
    let prevToken = data.prevPageToken;

    console.log("Este es el token de la siguiente pagina");
    console.log(nextToken); 

    let previous = document.querySelector('.prevBttn'); 
    let next = document.querySelector('.nextBttn'); 
    
    next.addEventListener('click', ( event ) => {
        console.log("Aqui entre al event listener de next y este es el token que mando");
        console.log(nextToken);
        fetchSearch(searchMade, nextToken); 
    }); 

    previous.addEventListener('click', (event) => {
        if(prevToken == "")
        {
            alert("This is the first page"); 
        }
        else
        {
            fetchSearch(searchMade, prevToken);
        }
    }); 
}
/*
function eventDelegation()
{
    let container = document.querySelector('.results'); 
    container.addEventListener('click', ( event ) => {
        if(event.target.matches('.clickable'))
        {
           // alert("This is the clickable option");
           window.open('https://www.youtube.com/watch?v=', '_blank');
        }
        else{
                console.log("This is no clickable");
        }
        console.log( event.currentTarget );
      console.log( event.target.match );
    }); 

}

*/

function retrieveInfo()
{
    let submit = document.querySelector('.submit');
    submit.addEventListener('click', ( event ) =>{
        event.preventDefault(); 

        let searchMade = document.querySelector('#searchMade').value; 
        let searchStatus = "firstSearch"; 
        console.log(searchMade); 

                fetchSearch(searchMade, searchStatus); 

    })
}

function init()
{
    retrieveInfo(); 
}

init(); 
