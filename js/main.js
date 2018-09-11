
/**
 * jag kommer att lägga upp API-nyckeln öppet på Github
 * så att ni kan ladda ner applikationen utan problem.
 * annars ska man aldrig lämna ut kodbas öppet med api-nycklar
 */
var API_KEY = "48a462518d46fee4c62640f416cc7f7f";

var formElem;
var flickrImgElem;
var largeImgElem;
var tags;


function init()
{
    formElem = document.getElementById("searchForm");
    flickrImgElem = document.getElementById("flickrImg");
    largeImgElem = document.getElementById("largeImg");

    formElem.searchBtn.addEventListener("click",searchImg);

    console.log("initFUnk");
}

function searchImg()
{
    console.log("search img fun");

    tags = formElem.tags.value;
	pageNr = 1;
	requestNewImgs();
}

function requestNewImgs() 
{
	var request; // Object för Ajax-anropet
	//flickrImgElem.innerHTML = "<img src='pics/progress.gif' style='border:none;' >";
	//pageNrElem.innerHTML = pageNr;
	if (XMLHttpRequest) { request = new XMLHttpRequest(); } // Olika objekt (XMLHttpRequest eller ActiveXObject), beroende på webbläsare
	else if (ActiveXObject) { request = new ActiveXObject("Microsoft.XMLHTTP"); }
	else { alert("Tyvärr inget stöd för AJAX, så data kan inte läsas in"); return false; }
	request.open("GET","https://api.flickr.com/services/rest/?api_key=" + API_KEY + "&method=flickr.photos.search&tags=" + tags + "&format=json&nojsoncallback=1",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if ( (request.readyState == 4) && (request.status == 200) ) newImgs(request.responseText);
	};
} 

function newImgs(response) {
	var i;			// Loopvariabel
	var photo;		// Ett foto i svaret
    var imgUrl;		// Adress till en bild
    
	response = JSON.parse(response);
    flickrImgElem.innerHTML = "";		
    
    for (i=0; i < response.photos.photo.length; i++) 
    {
		photo = response.photos.photo[i];
		imgUrl = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_s.jpg";
		newElem = document.createElement("img");
		newElem.setAttribute("src",imgUrl);
		newElem.setAttribute("data-photo",JSON.stringify(photo));
		newElem.addEventListener("click", showLargeImg);
		flickrImgElem.appendChild(newElem);
	}
}

function showLargeImg()
{
    var photo;		// Objekt med data om fotot
	var imgUrl;		// Adress till en bild
    photo = JSON.parse(this.getAttribute("data-photo"));
    console.log("photo", photo);
    imgUrl = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_z.jpg";
   
    largeImgElem.src = imgUrl;
    console.log("largeImgElem  " + largeImgElem.src);
}

window.addEventListener("load", init);