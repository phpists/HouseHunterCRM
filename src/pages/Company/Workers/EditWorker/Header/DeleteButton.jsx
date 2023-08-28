import { styled } from "styled-components";
import { ReactComponent as RemoveIcon } from "../../../../../assets/images/remove.svg";

export const DeleteButton = () => (
  <StyledDeleteButton className="flex items-center justify-center">
    <RemoveIcon />
  </StyledDeleteButton>
);

const StyledDeleteButton = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1.4px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
  cursor: pointer;
  g,
  path {
    transition: all 0.3s;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    g {
      opacity: 1;
    }
    path {
      fill: #fc4444;
    }
  }
`;
