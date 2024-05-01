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
  border: 2px solid var(--bg-20);
  transition: all 0.3s;
  margin-right: 16px;
  g {
    transition: all 0.3s;
  }
  &:hover {
    background: var(--bg-20);
    border: 2px solid transparent;
    g {
      opacity: 1;
    }
  }

  @media (max-width: 800px) {
    margin: 0;
  }
`;
