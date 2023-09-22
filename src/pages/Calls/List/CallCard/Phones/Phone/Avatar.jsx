import styled from "styled-components";
import avatar from "../../../../../../assets/images/small-avarar-orange.svg";

export const Avatar = () => <StyledAvatar avatar={avatar} />;

const StyledAvatar = styled.div`
  margin-right: 15px;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
`;
