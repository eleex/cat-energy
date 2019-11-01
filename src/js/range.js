var range = document.querySelector(".example__input-range");
var imgCatBefore = document.querySelector(".example__cat-before");
var imgCatAfter = document.querySelector(".example__cat-after");

function showRange(){
    imgCatBefore.style.width = range.value + "%";
    imgCatAfter.style.width = 100 - range.value + "%";
    console.log(range.value);
}