import styled from "styled-components";

export const Photo = ({ photo }) => <StyledPhoto photo={photo} />;

const StyledPhoto = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 10px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
`;
