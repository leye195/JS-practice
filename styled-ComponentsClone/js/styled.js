export const globalStyles = (args) => {
  const head = document.querySelector("head"),
    style = document.createElement("style");
  style.innerHTML = args[0];
  head.append(style);
};
const styled = (ele) => {
  const element = document.createElement(ele);
  return (args) => {
    const styles = args[0];
    element.style = styles;
    return element;
  };
};

export default styled;
