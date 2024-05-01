import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../../../assets/images/search.svg";

export const SeachInput = () => (
  <StyledSeachInput className="flex items-center justify-between">
    <div>
      <input type="text" placeholder="Оберіть" />
      <div className="label">Передати </div>
    </div>
    <button className="flex items-center justify-center">
      <SearchIcon />
    </button>
  </StyledSeachInput>
);

const StyledSeachInput = styled.div`
  padding: 6px 10px;
  border-radius: 9px 9px 0px 0px;
  border-bottom: var(--second-color-border);
  input {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    height: 18px;
    &::placeholder {
      color: var(--main-color);
      font-family: Overpass;
      font-size: 15px;
      font-style: normal;
      font-weight: var(--font-weight-100);
      line-height: 118%; /* 17.7px */
      letter-spacing: 0.3px;
    }
  }
  .label {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  button {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 8px;
    transition: all 0.3s;
    margin-left: 5px;
    &:hover {
      background: var(--bg-20);
      g {
        opacity: 1;
      }
    }
  }
`;
