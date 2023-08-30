import { styled } from "styled-components";
import { ReactComponent as SearchIcon } from "../../../../assets/images/search.svg";
import { useState } from "react";

export const Search = ({ open, onOpen }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <StyledSearch
      className="flex items-center justify-center"
      open={open}
      isFocused={isFocused}
      onClick={() => (!open ? onOpen() : null)}
    >
      <input
        type="text"
        placeholder="Пошук"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <SearchIcon />
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
  cursor: pointer;
  margin-right: 15px;
  input {
    width: 0;
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }
  &:hover {
    border: 2px solid transparent;
    background: rgba(255, 255, 255, 0.2);
    g {
      opacity: 1;
    }
  }
  ${({ isFocused }) =>
    isFocused &&
    `
    background: rgba(255, 255, 255, 0.2);
    g {
      opacity: 1;
    }
  `}
  ${({ open }) =>
    open &&
    `
    width: 240px;
    input {
        width: 100%;
    }
    padding: 8px 7px 6px 11px;
  `}
`;
