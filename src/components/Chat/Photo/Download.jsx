import { styled } from "styled-components";
import downloadIcon from "../../../assets/images/download.svg";
import { handleDownload } from "../../../utilits";

export const Download = ({ photo }) => (
  <StyledDownload
    className="flex items-center justify-center"
    onClick={() => handleDownload(photo)}
  >
    <img src={downloadIcon} alt="" />
  </StyledDownload>
);

const StyledDownload = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 8px;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: var(--chat-tag-bg);
  backdrop-filter: blur(3px);
  cursor: pointer;
`;
