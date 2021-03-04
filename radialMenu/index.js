const radial1 = document.querySelector('.radial-menu1 .toggle');
const menu1 = document.querySelector('.radial-menu1 .menu');
const plus1 = document.querySelector('.radial-menu1 #plus');

const radial2 = document.querySelector('.radial-menu2 .toggle');
const menu2 = document.querySelector('.radial-menu2 .menu');
const plus2 = document.querySelector('.radial-menu2 #plus');

let isOneClosed = true;
let isTwoClosed = true;

const handleToggle1 = () => {
  if(isOneClosed) {
    menu1.style.transform = `scale(3)`;
    plus1.style.transform = 'rotate(45deg)';
  } else {
    menu1.style.transform = `scale(0)`;
    plus1.style.transform = 'rotate(0deg)';
  }
  isOneClosed = !isOneClosed;
}

const handleToggle2 = () => {
    if(isTwoClosed) {
      menu2.style.transform = `scale(3)`;
      menu2.style.opcity = 1;
      plus2.style.transform = 'rotate(45deg)';     
    } else {
      menu2.style.transform = `scale(0)`;
      menu2.style.opcity = 0;
      plus2.style.transform = 'rotate(0deg)';
    }
    isTwoClosed = !isTwoClosed;
  }

const init = () => {
  radial1.addEventListener('click',handleToggle1);
  radial2.addEventListener('click',handleToggle2);
}

init();