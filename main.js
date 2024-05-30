var canvas = "";
var voiceSyntesiser = "";
var ModelVault = "";
var TextToSpeech = "";

function preload(){
ModelVault = ml5.imageClassifier("DoodleNet");
}

function setup(){
canvas = createCanvas(360,360);
background("white");
canvas.center();
canvas.mouseReleased(sketchClassifier);
voiceSyntesiser = window.speechSynthesis;
}

function draw(){
strokeWeight(13);
stroke("black");
if(mouseIsPressed){
line(pmouseX,pmouseY,mouseX,mouseY);    
}
}

function canvasRinser(){
    background("white"); 
}

function sketchClassifier(){
    ModelVault.classify(canvas,gotResult);
}

function gotResult(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    document.getElementById("item_guesser").innerHTML = "I guess it's a/an:" + results[0].label;
    document.getElementById("confidence").innerHTML = "I am " + Math.round(results[0].confidence*100) + "% confident";
    TextToSpeech = new SpeechSynthesisUtterance(results[0].label);
    voiceSyntesiser.speak(TextToSpeech);
}
}