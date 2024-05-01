import { styled } from "styled-components";
import { ReactComponent as SearchIcon } from "../../../../assets/images/search.svg";
import { useState } from "react";

export const Search = ({ value, onChange }) => {
  const [focused, setFocused] = useState(false);
  return (
    <StyledSearch focused={focused}>
      <input
        type="text"
        placeholder="Пошук"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
    border: 1.4px solid var(--bg-20);
    padding: 8px 25px 6px 11px;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    transition: all 0.3s;
    &::placeholder {
      color: var(--second-color);
    }
    &:hover,
    &:focus {
      background: var(--bg-20);
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
  @media (max-width: 800px) {
    display: none;
  }
`;
