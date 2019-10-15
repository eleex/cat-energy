var openMenu = document.querySelector(".header__open-menu");
var closeMenu = document.querySelector(".header__close-menu");
var navigation = document.querySelector(".navigation");

openMenu.addEventListener("click", function(evt){
    evt.preventDefault();
    openMenu.classList.toggle("display--none");
    closeMenu.classList.toggle("display--none");
    navigation.classList.toggle("display--none");
})

closeMenu.addEventListener("click", function(evt){
    evt.preventDefault();
    closeMenu.classList.toggle("display--none");
    openMenu.classList.toggle("display--none");
    navigation.classList.toggle("display--none");
})
