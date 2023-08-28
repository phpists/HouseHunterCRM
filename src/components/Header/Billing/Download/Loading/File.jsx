import fileIcon from "../../../../../assets/images/file.svg";
import fileLoadedcon from "../../../../../assets/images/file-loaded.svg";
import { styled } from "styled-components";

export const File = ({ isLoaded }) => (
  <StyledFile className="flex items-center justify-center" isLoaded={isLoaded}>
    <img src={isLoaded ? fileLoadedcon : fileIcon} alt="" />
  </StyledFile>
);

const StyledFile = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 6px;
  background: ${({ isLoaded }) => (isLoaded ? "#2FA112" : "#5d63ff")};
  margin-right: 7px;
`;
