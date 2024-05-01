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
      background: var(--bg-20);
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
