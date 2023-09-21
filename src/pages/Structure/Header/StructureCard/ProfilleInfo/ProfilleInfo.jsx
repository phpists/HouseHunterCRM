import styled from "styled-components";
import { Header } from "./Header/Header";
import { Divider } from "./Divider";
import { Phones } from "../../../../../components/Phones/Phones";
import { Email } from "./Email";
import bg from "../../../../../assets/images/profile-bg.png";

export const ProfilleInfo = ({ onOpenInfo }) => {
  return (
    <StyledProfilleInfo bg={bg} onClick={onOpenInfo} className="notClickable">
      <Header />
      <Divider />
      <Phones className="phones-wrapper notClickable" />
      <Email />
    </StyledProfilleInfo>
  );
};

const StyledProfilleInfo = styled.div`
  border-radius: 10px;
  background: rgba(50, 50, 50, 0.8);
  padding: 14px 10px 12px 51px;
  width: 316px;
  height: 220px;
  position: relative;
  margin-right: 10px;
  .phones-wrapper {
    grid-template-columns: 1fr max-content !important;
    margin-bottom: 4px;
    width: 100%;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 100%;
    background: url(${({ bg }) => bg}) center/cover no-repeat;
  }
`;
