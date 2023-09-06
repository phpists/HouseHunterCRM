import { styled } from "styled-components";

export const Photo = ({ photo }) => <StyledPhoto photo={photo} />;

const StyledPhoto = styled.div`
  width: 193px;
  height: 193px;
  border-radius: 10px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
`;
