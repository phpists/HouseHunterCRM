import styled from "styled-components";

export const Photo = ({ photo }) => (
  <StyledPhoto photo={photo} className="clickable" />
);

const StyledPhoto = styled.div`
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 5px;
`;
