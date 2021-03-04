const body = document.body;
const header = document.querySelector('.header');
//let isScrolling = false;
let lastScrollTop = 0;

const scrollStop = () => {
  header.classList.remove('header__hide');
}

const init = () => {  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop) {
        header.classList.add('header__hide');
    } else {
        header.classList.remove('header__hide');
    }
    lastScrollTop = scrollTop;
    //window.clearTimeout(isScrolling);
    //isScrolling = setTimeout(scrollStop,50);
  },false);
}

init()
