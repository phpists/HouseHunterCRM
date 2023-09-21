import styled from "styled-components";
import img from "../../../../../../assets/images/profile-avatar.svg";

export const Avatar = () => <StyledAvatar img={img} />;

const StyledAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 34px;
  border: 1px solid #7ecefd;
  background: url(${({ img }) => img}) center/cover no-repeat;
  margin-right: 8px;
`;
