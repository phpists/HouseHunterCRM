import styled from "styled-components";
import { Title } from "./Title";
import { Clients } from "./Clients";
import { Request } from "./Request";
import { Biling } from "./Biling";
import { Calls } from "./Calls";
import { Structure } from "./Structure";
import { Other } from "./Other";
import { Objects } from "./Objects";
import { Footer } from "./Footer";

export const Dropdown = ({ iconColor }) => (
  <StyledDropdown iconColor={iconColor}>
    <Title title="Клієнти" />
    <Clients />
    <Title title="запити" />
    <Request />
    <Title title="Об'єкти" />
    <Objects />
    <Title title="Дзвінки" />
    <Calls />
    <Title title="Структура" />
    <Structure />
    <Title title="Білінг" />
    <Biling />
    <Title title="Інше" />
    <Other />
    <Footer />
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  padding: 20px 10px;
  border-radius: 0 0 6px 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ iconColor }) => iconColor};
  border-top: none;
`;
