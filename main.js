function setup(){
c1 = createCanvas(500, 450);

c1.position(470, 150);
v1 = createCapture(VIDEO);
v1.hide();
myModel = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status_val").innerHTML = "Detecting Objects";
}

status = "";
objects = [];
song = "";

function preload(){
song = loadSound("old_telephone.mp3");

}

function modelLoaded(){
console.log("Model has Loaded");
status = true; 
}

function gotResult(error, results){
 if (error){
 console.error(error);
 }
 else{
console.log(results);
objects = results;
 }

}

function draw(){
image (v1, 0, 0,  500, 450);

 if (status != ""){

    r = random(255);
    g = random(255);
    b = random(255);

    myModel.detect(v1, gotResult);
 for (i=0;i < objects.length;i++){
document.getElementById("status_val").innerHTML = "Object Detected";

objects_name = objects[i].label;
object_accuracy = floor(objects[i].confidence * 100);

fill (r,g,b);
stroke (r,g,b);
text (objects_name + " "+ object_accuracy + "%", objects[i].x, objects[i].y);
textSize (18);
noFill();
stroke (r,g,b);
rect (objects[i].x - 15, objects[i].y-15, objects[i].width, objects[i].height);
strokeWeight(2);

if (objects_name == "person"){
document.getElementById("baby_name").innerHTML = "Baby Detected";
song.stop();}

else{
document.getElementById("baby_name").innerHTML = "Baby Not Detected";
song.play();}
 }


 }

}