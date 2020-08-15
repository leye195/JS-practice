import styled from "../js/styled.js";

const Container = styled("div")`
  height: 90vh;
  width: 100vw;
  background-color: #e3e3e3;
`;
const Section = styled("section")`
  width: 60vw;
  height: 100%;
  background-color: white;
  margin: 0 auto;
`;
const H1 = styled("h1")`
  font-weight: bold;
  color: black;
  text-align: center;
  padding: 10px;
`;

H1.innerText = `Style-Components Cloning`;
Section.append(H1);
Container.append(Section);

export default Container;
