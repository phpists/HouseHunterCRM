import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { DeleteButton } from "./DeleteButton";
import { Id } from "./Id";

export const Header = ({ onClose }) => (
  <StyledHeader className="flex items-center justify-between">
    <BackButton onClose={onClose} />
    <Id />
    <DeleteButton />
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 18px 19px 18px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;
