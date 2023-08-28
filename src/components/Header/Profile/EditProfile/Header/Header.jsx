import { styled } from "styled-components";
import { Close } from "./Close";
import { Lang } from "./Lang/Lang";

export const Header = ({ onClose }) => (
  <StyledHeader className="flex items-center justify-between">
    <Close onClose={onClose} />
    <Lang />
  </StyledHeader>
);

const StyledHeader = styled.div`
  margin-bottom: 8px;
  padding-left: 5px;
`;
