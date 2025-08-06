import styled from "styled-components";

export const NewTag = () => <StyledNewTag>New</StyledNewTag>;

const StyledNewTag = styled.div`
  padding: 1px 4px 2px 4px;
  border-radius: 5px;
  color: var(--green);
  background: rgb(59 133 1 / 68%);
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.02em;
  text-align: left;
  z-index: 12;
  backdrop-filter: blur(5.465116500854492px);
`;
