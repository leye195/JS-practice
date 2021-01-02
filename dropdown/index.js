(()=>{
  const options = document.querySelector(".options");
  const selected = document.querySelector(".selected");
  const nextButton = document.querySelector(".next-button");

  selected.addEventListener("click",(e)=>{
    e.preventDefault();
    options.classList.toggle("show");
  })

  selected.addEventListener("blur", () => {
    options.classList.remove("show");
  })

  options.addEventListener("click", (e) => {
      e.preventDefault();
      const { target: { dataset: { value } } } = e; 
      selected.innerHTML = value;
      nextButton.removeAttribute("disabled");
  })

})()