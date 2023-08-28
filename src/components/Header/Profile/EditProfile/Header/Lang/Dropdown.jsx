import { styled } from "styled-components";
import uaIcon from "../../../../../../assets/images/ua-flag.svg";
import usIcon from "../../../../../../assets/images/us-flag.svg";
import { LangCard } from "./LangCard";

export const Dropdown = () => (
  <StyledDropdown className="dropdown">
    <LangCard title="En" icon={usIcon} className="lang" />
    <LangCard title="Ru" icon={uaIcon} className="lang" />
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  .lang {
    border-radius: 0px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    &:last-child {
      border-radius: 0px 0px 5px 5px;
      border-bottom: none;
    }
  }
`;
