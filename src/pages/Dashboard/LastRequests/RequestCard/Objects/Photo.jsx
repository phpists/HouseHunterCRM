import styled from "styled-components";

export const Photo = ({ photo }) => <StyledPhoto photo={photo} />;

const StyledPhoto = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 5px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  margin-right: 8px;
`;
