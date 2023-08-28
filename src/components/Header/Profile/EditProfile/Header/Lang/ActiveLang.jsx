import { styled } from "styled-components";
import { LangCard } from "./LangCard";
import uaIcon from "../../../../../../assets/images/ua-flag.svg";

export const ActiveLang = () => (
  <StyledActiveLang>
    <LangCard title="Ua" icon={uaIcon} className="active-lang" />
  </StyledActiveLang>
);

const StyledActiveLang = styled.div`
  .active-lang {
    background: none;
    backdrop-filter: none;
    width: 34px;
    overflow: hidden;
    justify-content: end;
    transition: all 0.3s;
    div {
      border: none;
    }
  }
  &:hover {
    & > .active-lang {
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
