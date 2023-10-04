import { styled } from "styled-components";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";

export const CreateButton = () => (
  <StyledCreateButton className="flex items-center justify-center">
    <PlusIcon />
  </StyledCreateButton>
);

const StyledCreateButton = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
  margin-right: 16px;
  g {
    transition: all 0.3s;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid transparent;
    g {
      opacity: 1;
    }
  }

  @media (max-width: 800px) {
    margin: 0;
  }
`;
