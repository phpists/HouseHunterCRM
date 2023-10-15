import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Divider } from "./Divider";
import { SectionTitle } from "./SectionTitle";
import { BasicInfo } from "./BasicInfo";
import { Contact } from "./Contact/Contact";
import { Comment } from "./Comment";
import { OtherInfo } from "./OtherInfo/OtherInfo";
import maskBackground from "../../../assets/images/auth-shape-mask.svg";

export const Profile = ({ className }) => {
  return (
    <StyledProfile maskBackground={maskBackground} className={className}>
      <Header />
      <Divider />
      <div className="profile-content hide-scroll">
        <SectionTitle title="Дані клієнта" />
        <BasicInfo />
        <SectionTitle title="Контакти" />
        <Contact />
        <SectionTitle title="Коментар" />
        <Comment />
        <SectionTitle title="Фото / Додатково" />
        <OtherInfo />
      </div>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  width: 316px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #3d3d3d;
  position: relative;
  .profile-content {
    padding: 0 10px 10px;
    height: calc(100svh - 348px);
    overflow: auto;
    border-radius: 10px;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(${({ maskBackground }) => maskBackground}) center/cover
      no-repeat;
    background-size: 200%;
    background-position: -292px -557px;
  }
  @media (min-width: 1400px) {
    width: 290px;
  }
  @media (min-width: 1600px) {
    width: 316px;
  }
`;
