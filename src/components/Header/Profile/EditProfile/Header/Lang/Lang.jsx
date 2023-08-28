import { styled } from "styled-components";
import { ActiveLang } from "./ActiveLang";
import { Dropdown } from "./Dropdown";

export const Lang = () => {
  return (
    <StyledLang>
      <ActiveLang />
      <Dropdown />
    </StyledLang>
  );
};

const StyledLang = styled.button`
  position: relative;
  &:focus {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
    .active-lang {
      border-radius: 5px 5px 0 0;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4.5px);
      width: 67px;
      overflow: hidden;
      justify-content: end;
      div {
        border: 1px solid #fff;
      }
    }
  }
`;
