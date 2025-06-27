import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Arrow } from "../SelectTags/Arrow";

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
    props.selected ? "rgba(88, 175, 255, 0.3)" : "transparent"};
  color: ${(props) => (props.selected ? "#58afff" : "var(--main-color, #fff)")};

  &:hover {
    background: rgba(200, 200, 200, 0.2);
    color: var(--main-color, #fff);
  }
`;

const MultipleAccordion = ({ label, options = [], onChange, active, kpp }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [search, setSearch] = useState("");
  const arrowRef = useRef(null);
  const autoKpp = ["2", "3", "4", "5"];

  // Sync with external active prop
  useEffect(() => {
    if (active === undefined || active === null) {
      setSelectedOptions([]);
    } else {
      const activeValues = Array.isArray(active)
        ? active.map((opt) => opt.value)
        : [active.value];
      const foundOptions = options.filter((opt) =>
        activeValues.includes(opt.value)
      );
      setSelectedOptions(foundOptions);
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
    let newSelectedOptions;
    if (selectedOptions.some((opt) => opt.value === option.value)) {
      // Deselect if already selected
      newSelectedOptions = selectedOptions.filter(
        (opt) => opt.value !== option.value
      );
    } else {
      // Add to selection
      newSelectedOptions = [...selectedOptions, option];
    }

    if (kpp) {
      if (option.value === "2") {
        if (!selectedOptions.filter((f) => f.value === option.value).length) {
          const result = options.filter((f) => autoKpp.includes(f.value));
          newSelectedOptions = [...selectedOptions, ...result];
        } else {
          newSelectedOptions = selectedOptions.filter(
            (f) => !autoKpp.includes(f.value)
          );
        }
      }
    }

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions.map((opt) => opt.value));
  };

  // Display selected options or label
  const displayTitle = () => {
    if (selectedOptions.length === 0) return label;
    if (selectedOptions.length === 1) return selectedOptions[0].title;
    return `${selectedOptions.length} items selected`;
  };

  return (
    <AccordionWrapper>
      <AccordionItem>
        <AccordionTitle
          onClick={toggleAccordion}
          className={isActive ? "open" : ""}
          active={isActive}
        >
          <span>{displayTitle()}</span>
          <Arrow active={isActive} innerRef={arrowRef} className="main-arrow" />
        </AccordionTitle>
        <AccordionContent active={isActive}>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук"
            autoFocus
          />
          {filteredOptions.map((option) => (
            <ListItem
              key={option.value}
              selected={selectedOptions.some(
                (opt) => opt.value === option.value
              )}
              onClick={() => handleSelectOption(option)}
            >
              {option.title}
            </ListItem>
          ))}
          {filteredOptions.length === 0 && (
            <ListItem>Нічого не знайдено</ListItem>
          )}
        </AccordionContent>
      </AccordionItem>
    </AccordionWrapper>
  );
};

export default MultipleAccordion;
