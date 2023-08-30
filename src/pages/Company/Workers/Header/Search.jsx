import { styled } from "styled-components";
import { ReactComponent as SearchIcon } from "../../../../assets/images/search.svg";
import { useState } from "react";

export const Search = () => {
  const [focused, setFocused] = useState(false);
  return (
    <StyledSearch focused={focused}>
      <input
        type="text"
        placeholder="Пошук"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <SearchIcon />
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  position: relative;
  input {
    width: 240px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1.4px solid rgba(255, 255, 255, 0.2);
    padding: 8px 25px 6px 11px;
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    transition: all 0.3s;
    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  svg {
    position: absolute;
    top: 7px;
    right: 7px;
    transition: all 0.3s;
  }

  &:hover {
    g {
      opacity: 1;
    }
  }
  ${({ focused }) =>
    focused &&
    `
    g {
      opacity: 1;
    }
  `}
`;
