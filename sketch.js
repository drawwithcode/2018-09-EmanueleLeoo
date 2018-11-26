var myMap;
var myLoc;
var canvas;
var mappa = new Mappa('Leaflet');

var points = [];

// see https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
watchOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// Lets put all our map options in a single object
var options = {
	lat: 0,
	lng: 0,
	zoom: 7,
	style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload(){
  // put preload code here
  myLoc = getCurrentPosition();
  points.push(myLoc);
}

function setup() {
	//create the canvas
	canvas = createCanvas(windowWidth, windowHeight);

	//set up the watch function, define which function to call everytime the position changes
	watchPosition(onPositionChange);

	//update options centering the map on the first position
	options.lat = myLoc.latitude;
	options.lng = myLoc.longitude;
	console.log(options)

	// Create a tile map with the options declared
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas);
}

function draw() {
	//clear the canvas
	clear();

	for(var i = 0; i < points.length; i++){
		// get the saved point from the array
		var point = points[i];
		//project it on the current map
		var pointOnMap = myMap.latLngToPixel(point.latitude, point.longitude);
		//draw an ellipse
		fill(random(150, 255), random(0, 150), random(0, 200));
    stroke('black');
    strokeWeight(3.2);
		ellipse(pointOnMap.x, pointOnMap.y, 23);

    noFill();
    stroke(random(0, 250), random(0, 100), random(0, 200));
    strokeWeight(2);
    ellipse(pointOnMap.x, pointOnMap.y, random(23, 600));
    stroke(random(0, 250), random(0, 150), random(0, 250));
    ellipse(pointOnMap.x, pointOnMap.y, random(23, 1800));
    stroke(random(0, 250), random(0, 50), random(0, 150));
    ellipse(pointOnMap.x, pointOnMap.y, random(23, 300));
	}

 fill('black');
 noStroke();
 rect(width-300, height-150, 300, 150);
 noFill();
 stroke(random(200, 255), random(0, 100), random(0, 180));
 strokeWeight(2);
 ellipse(width-150, height-75, random(0, 140));
 stroke(random(0, 255), random(0, 150), random(0, 250));
 ellipse(width-150, height-75, random(0, 100));
 stroke(random(100, 255), random(0, 250), random(200, 250));
 ellipse(width-150, height-75, random(0, 50));
 noStroke();
 fill('white');
 textStyle(NORMAL);
 textSize(20);
 textFont('Helvetica');
 text('YOUR POSITION', width-220, height-65)


}

function onPositionChange(newPosition) {
	points.push(newPosition);
}
