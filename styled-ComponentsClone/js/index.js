import { globalStyles } from "./styled.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Main from "../components/Main.js";
globalStyles`
  *{
    padding:0;
    margin:0;
    box-sizing:border-box;
  }
`;

const render = () => {
  const body = document.body;
  body.append(Header("Title"));
  body.append(Main);
  body.append(Footer);
};

render();
