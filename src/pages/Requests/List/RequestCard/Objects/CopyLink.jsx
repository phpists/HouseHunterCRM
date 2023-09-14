import styled from "styled-components";
import linkIcon from "../../../../../assets/images/link.svg";

export const CopyLink = () => (
  <StyledCopyLink className="flex items-center justify-center">
    <img src={linkIcon} alt="" />
  </StyledCopyLink>
);

const StyledCopyLink = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.18);
  transition: all 0.3s;
  margin-right: 4px;
  padding: 4px;
  img {
    height: 15px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.38);
  }
  &:active {
    background: rgba(255, 255, 255, 0.6);
  }
`;
