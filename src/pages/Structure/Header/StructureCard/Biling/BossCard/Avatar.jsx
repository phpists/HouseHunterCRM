import styled from "styled-components";
import img from "../../../../../../assets/images/small-avatar-green.svg";

export const Avatar = ({ photo, color }) => (
  <StyledAvatar img={photo?.length > 0 ? photo : img} color={color} />
);

const StyledAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 34px;
  border: 1px solid ${({ color }) => color};
  background: url(${({ img }) => img}) center/cover no-repeat;
  margin-right: 8px;
`;
