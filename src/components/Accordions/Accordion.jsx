import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Arrow } from "../SelectTags/Arrow";

// Container for the accordion
const AccordionWrapper = styled.div`
  max-width: 600px;
  font-family: Arial, sans-serif;
`;

// Individual accordion item
const AccordionItem = styled.div`
  border-radius: 9px;
  position: relative;
  width: 100%;
  ${({ error }) => error === "true" && "border: 1px solid red;"}
`;

// Accordion title (header)
const AccordionTitle = styled.button`
  padding: 6px 10px;
  color: var(--main-color, #fff);
  font-family: Overpass, sans-serif;
  font-size: 14px;
  font-weight: 100;
  line-height: 118%; /* 17.7px */
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
  transition: all 0.1s; /* Matches SelectTags transition */

  &:hover {
    background: var(--card-bg-2, #2c2c2e);
    opacity: 1;
    .main-arrow {
      opacity: 1; /* Show arrow on hover */
    }
  }

  &.open {
    border-radius: 9px 9px 0 0 !important;
    border-bottom: var(
      --second-color-border,
      1px solid #3a3a3c
    ); /* Matches open state */
    .main-arrow {
      opacity: 1; /* Show arrow when open */
    }
  }

  .main-arrow {
    opacity: 0; /* Hide arrow by default */
  }
`;

// Accordion content
const AccordionContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  padding: ${(props) => (props.active ? "15px 10px" : "0 10px")};
  background: var(--card-bg-2, #2c2c2e);
  border-radius: 0 0 9px 9px;
`;

// Search input
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

// List item for selectable options
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
    background: rgba(200, 200, 200, 0.2); /* Gray hover effect */
    color: var(--main-color, #fff);
  }
`;

const Accordion = ({ label, options, onChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [search, setSearch] = useState("");
  const arrowRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAccordion = () => {
    setIsActive(!isActive);
    setSearch("");
  };

  const handleSelectOption = (option) => {
    if (selectedOption?.value === option.value) {
      setSelectedOption(null); // Deselect if clicking the same option
      setSearch(""); // Clear search on deselection
      if (onChange) {
        onChange(null); // Trigger onChange with null when deselecting
      }
    } else {
      setSelectedOption(option); // Select new option
      setIsActive(false); // Close accordion on new selection
      setSearch(""); // Clear search on selection
      if (onChange) {
        onChange(option.value); // Trigger onChange with the value of the new item
      }
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
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук"
            autoFocus
          />
          {filteredOptions.map((option) => (
            <ListItem
              key={option.value}
              selected={selectedOption?.value === option.value}
              onClick={() => handleSelectOption(option)}
            >
              {option.title}
            </ListItem>
          ))}
          {filteredOptions.length === 0 && (
            <ListItem>No options found</ListItem>
          )}
        </AccordionContent>
      </AccordionItem>
    </AccordionWrapper>
  );
};

export default Accordion;
