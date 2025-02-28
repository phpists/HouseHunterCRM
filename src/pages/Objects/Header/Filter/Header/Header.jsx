import { styled } from "styled-components";
import { Title } from "./Title";
import { Close } from "./Close";

export const Header = ({ onClose }) => (
  <StyledHeader className="flex items-center justify-between">
    <Title />
    <Close onClose={onClose} />
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 18px 20px 20px;
`;
