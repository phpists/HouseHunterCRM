import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Divider } from "./Divider";
import { SectionTitle } from "./SectionTitle";
import { BasicInfo } from "./BasicInfo";
import { Contact } from "./Contact/Contact";
import { Comment } from "./Comment";
import { OtherInfo } from "./OtherInfo/OtherInfo";

export const Profile = () => {
  return (
    <StyledProfile>
      <Header />
      <Divider />
      <div className="profile-content hide-scroll">
        <SectionTitle title="Basic info" />
        <BasicInfo />
        <SectionTitle title="Contact" />
        <Contact />
        <SectionTitle title="Comment" />
        <Comment />
        <SectionTitle title="Other info" />
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
    height: calc(100svh - 474px);
    overflow: auto;
  }
`;
