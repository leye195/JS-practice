import styled from "../js/styled.js";

const Header = styled("header")`
  margin: 0;
  padding: 10px;
  height: 5vh;
  font-weight: bold;
  background-color: black;
`;
const Title = styled("h1")`
  color: white;
`;
const renderHeader = (title) => {
  Title.innerText = title;
  Header.append(Title);
  return Header;
};
export default renderHeader;
