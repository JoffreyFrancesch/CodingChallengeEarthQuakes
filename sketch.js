var mapImage;

var clon = 0;
var clat = 0;

//Latitude : 48.866667
//Longitude: 2.333333

var lon = 2.333333;
var lat = 48.866667;

var zoom = 1;
var earthquakes;

function preload() {
	mapImage = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoiam9mZnJleWZyYW5jZXNjaCIsImEiOiJjamZ3cHJob3gxbGRxMnptd2ltNnV3b3hnIn0.DCxdtFMhnsFocwJKPlbVJQ');
	//earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');

	earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function mercatorX(lon) {
	lon = radians(lon);
	var a = (256 / PI) * pow(2, zoom);
	var b = lon + PI;
	return a * b;
}

function mercatorY(lat) {
	lat = radians(lat);
	var a = (256 / PI) * pow(2, zoom);
	var b = tan(PI / 4 + lat / 2);
	var c = PI - log(b);
	return a * c;
}

function setup() {
	createCanvas(1024, 512);
	translate(width / 2, height / 2);
	imageMode(CENTER);
	image(mapImage, 0, 0);

	var cx = mercatorX(clon);
	var cy = mercatorY(clat);

	for (var i = 0; i < earthquakes.length; i++) {
		var data = earthquakes[i].split(/,/);
		//console.log(data);

		var lat = data[1];
		var lon = data[2];
		var magnitude = data[4];

		var x = mercatorX(lon) - cx;
		var y = mercatorY(lat) - cy;

		magnitude = pow(10, magnitude);
		magnitude = sqrt(magnitude)

		var maxMag = sqrt(pow(10, 10));

		var d = map(magnitude, 0, maxMag, 0, 180);
		stroke(255, 0, 255);
		fill(255, 0, 255, 200);
		ellipse(x, y, d, d);
	}
}