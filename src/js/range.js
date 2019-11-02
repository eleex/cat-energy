var range = document.querySelector(".example__input-range");
var imgCatBefore = document.querySelector(".example__cat-before");
var imgCatAfter = document.querySelector(".example__cat-after");

function showRange(){
    imgCatBefore.style.width = range.value + "%";
    imgCatAfter.style.width = 100 - range.value + "%";
    range.style.background = 'linear-gradient(90deg, rgb(104, 183, 56) ' 
                                + range.value + '%, ' 
                                + 'rgb(220, 220, 220) ' + range.value + '%' + ')';
}

range.addEventListener("input", showRange);