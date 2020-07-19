(() => {
  const container = document.querySelector(".list-container"),
    resetButton = document.querySelector(".reset"),
    form = document.querySelector(".form"),
    input = document.querySelector(".form input");

  itemList = [1, 2, 3, 4, 5];
  let prevTarget = null;
  const resetList = () => {
    const list = container.querySelectorAll("li");
    Array.prototype.forEach.call(list, (node, idx) => {
      node.innerHTML = itemList[idx];
    });
  };

  const insertItem = () => {
    const value = input.value;
    const li = document.createElement("li");
    li.draggable = true;
    li.innerText = value;
    itemList.push(value);
    container.appendChild(li);
    input.value = "";
  };

  const handleDragStart = (e) => {
    const { target, dataTransfer } = e;
    if (target.nodeName === "LI") {
      if (prevTarget === null) {
        prevTarget = target;
        dataTransfer.setData("application/item", target.innerText);
      }
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  const handleDragEnd = (e) => {
    prevTarget = null;
  };
  const handleDrop = (e) => {
    const { target, dataTransfer } = e;
    const data = dataTransfer.getData("application/item");
    if (target.nodeName === "LI" && String(data).length > 0) {
      prevTarget.innerText = target.innerText;
      target.innerText = data;
    }
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertItem();
  };

  const init = () => {
    if (container) {
      container.addEventListener("dragstart", handleDragStart);
      container.addEventListener("dragover", handleDragOver);
      container.addEventListener("dragenter", handleDragEnter);
      container.addEventListener("dragend", handleDragEnd);
      container.addEventListener("drop", handleDrop);
    }
    if (resetButton) resetButton.addEventListener("click", resetList);
    if (form) form.addEventListener("submit", handleSubmit);
  };
  init();
})();
