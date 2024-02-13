import styled from "styled-components";
import { ReactComponent as StatiscticIcon } from "../../../../../../assets/images/statistic.svg";

export const Icon = ({ open, onToggleOpen }) => (
  <StyledIcon
    className="flex items-center justify-center clickable notClickable"
    open={open}
    onClick={onToggleOpen}
  >
    <StatiscticIcon className="clickable notClickable" />
  </StyledIcon>
);

const StyledIcon = styled.button`
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  ${({ open }) => open && "margin-left: 17px;"}
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    path {
      fill-opacity: 1;
    }
  }
`;
