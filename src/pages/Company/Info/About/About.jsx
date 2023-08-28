import { styled } from "styled-components";
import { Title } from "./Title";
import { Description } from "./Description";
import editIcon from "../../../../assets/images/edit-company.svg";

export const About = () => {
  return (
    <StyledAbout className="hover-effect-to-right">
      <img src={editIcon} alt="" />
      <Title />
      <Description />
    </StyledAbout>
  );
};

const StyledAbout = styled.div`
  margin-bottom: 16px;
  padding: 11px 20px 10px 11px;
  border-radius: 13px;
  cursor: pointer;
  position: relative;
  img {
    position: absolute;
    top: 10px;
    right: 10px;
    transform: translateX(-5px);
    opacity: 0;
    transition: all 0.3s;
    visibility: hidden;
    width: 17px;
  }
  &:hover {
    img {
      opacity: 1;
      transition: all 0.3s;
      visibility: visible;
      transform: translateX(0px);
    }
  }
`;
