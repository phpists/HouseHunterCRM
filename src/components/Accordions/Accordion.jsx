import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Arrow } from "../SelectTags/Arrow";
import checkIcon from "../../assets/images/circle-green-check.svg";

const AccordionWrapper = styled.div`
  max-width: 600px;
  font-family: Arial, sans-serif;
`;

const AccordionItem = styled.div`
  border-radius: 9px;
  position: relative;
  width: 100%;
  ${({ error }) => error === "true" && "border: 1px solid red;"}
`;

const AccordionTitle = styled.button`
  padding: 6px 10px;
  color: var(--main-color, #fff);
  font-family: Open Sans;
  opacity: 0.4;
  font-size: 14px;
  line-height: 118%;
  letter-spacing: 0.3px;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 9px;
  transition: all 0.1s;

  &:hover {
    background: var(--card-bg-2, #2c2c2e);
    opacity: 1;
    .main-arrow {
      opacity: 1;
    }
  }

  &.open {
    border-radius: 9px 9px 0 0 !important;
    border-bottom: var(--second-color-border, 1px solid #3a3a3c);
    .main-arrow {
      opacity: 1;
    }
  }

  .main-arrow {
    opacity: 0;
  }
`;

const AccordionContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  padding: ${(props) => (props.active ? "15px 10px" : "0 10px")};
  background: var(--card-bg-2, #2c2c2e);
  border-radius: 0 0 9px 9px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--main-color, #fff);
  font-family: Overpass, sans-serif;
  font-size: 14px;
  font-weight: 100;
  line-height: 118%;
  letter-spacing: 0.3px;

  &::placeholder {
    color: var(--main-color, #fff);
    opacity: 0.6;
    font-family: Overpass, sans-serif;
    font-size: 14px;
    font-weight: 100;
    line-height: 118%;
    letter-spacing: 0.3px;
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  color: var(--main-color, #fff);
  font-family: Overpass, sans-serif;
  font-size: 14px;
  font-weight: 100;
  line-height: 118%;
  letter-spacing: 0.3px;
  cursor: pointer;
  border-radius: 5px;
  background: ${(props) =>
    props.selected ? "rgba(280, 248, 53, 0.1)" : "transparent"};
  color: ${(props) =>
    props.selected ? "var(--green-light-2)" : "var(--main-color, #fff)"};

  &:hover {
    background: rgba(200, 200, 200, 0.2);
    color: var(--main-color, #fff);
  }
`;

const ClearButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--main-color, #fff);
  border: none;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 100;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-bottom: 15px;

  &:hover:enabled {
    background: rgba(255, 255, 255, 0.15);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Accordion = ({
  label,
  options = [],
  onChange,
  active,
  hideClearBtn,
  hideSearch,
  categoryFilter,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [search, setSearch] = useState("");
  const arrowRef = useRef(null);

  // Синхронизация с внешним active
  useEffect(() => {
    if (active === undefined || active === null) {
      setSelectedOption(null);
    } else {
      const foundOption = options.find((opt) => opt.value === active);
      setSelectedOption(foundOption || null);
    }
  }, [active, options]);

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAccordion = () => {
    setIsActive(!isActive);
    setSearch("");
  };

  const handleSelectOption = (option) => {
    let newValue = selectedOption?.value === option.value ? "1" : option.value;
    if (label === "Cортування") {
      newValue = selectedOption?.value === option.value ? "0" : option.value;
    }

    if (categoryFilter) {
      // if categoryFilter is true that means that we cannot unchose first option (легковi)
      if (!(selectedOption?.value === "1" && option.value === "1")) {
        setSelectedOption(newValue ? option : "1");
        setIsActive(false);
        setSearch("");
        onChange?.(newValue);
      } else {
        setIsActive(false);
      }
    } else {
      if (selectedOption?.value === option.value) {
        handleClose();
      } else {
        setSelectedOption(newValue ? option : "1");
        setIsActive(false);
        setSearch("");
        onChange?.(newValue);
      }
    }
  };

  const handleClose = () => {
    if (selectedOption) {
      onChange?.(null);
      setSelectedOption(null);
      setIsActive(false);
    } else {
      setIsActive(false);
    }
  };

  return (
    <AccordionWrapper>
      <AccordionItem>
        <AccordionTitle
          onClick={toggleAccordion}
          className={isActive ? "open" : ""}
          active={isActive}
        >
          <span>{selectedOption ? selectedOption.title : label}</span>
          <Arrow active={isActive} innerRef={arrowRef} className="main-arrow" />
        </AccordionTitle>
        <AccordionContent active={isActive}>
          {!hideSearch && (
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Пошук"
              autoFocus
            />
          )}
          {!hideClearBtn && (
            <ClearButton onClick={handleClose}>Очистити всі</ClearButton>
          )}
          {filteredOptions.map((option) => (
            <>
              <ListItem
                key={option.value}
                selected={selectedOption?.value === option.value}
                onClick={() => handleSelectOption(option)}
              >
                {option.title}
                {selectedOption?.value === option.value && (
                  <img src={checkIcon} alt="" />
                )}
              </ListItem>
            </>
          ))}
          {filteredOptions.length === 0 && (
            <ListItem>Нічого не знайдено</ListItem>
          )}
        </AccordionContent>
      </AccordionItem>
    </AccordionWrapper>
  );
};

export default Accordion;
