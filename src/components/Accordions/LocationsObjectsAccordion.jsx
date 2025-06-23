import React, { useState } from "react";
import styled from "styled-components";
import { Arrow } from "../SelectTags/Arrow";
import { CheckOption } from "../CheckOption";
import { locationsObjectsFilter as data } from "../../constants";
import { useGetLocationsQuery } from "../../store/requests/requests.api";
import { Select } from "../Select/Select";
import { Tag } from "../SelectTags/Tag";
import { handleGetLocationAllPath } from "../../utilits";

const AccordionWrapper = styled.div`
  max-width: 600px;
  font-family: Overpass, sans-serif;
`;

const AccordionItem = styled.div`
  border-radius: 9px;
  position: relative;
  width: 100%;
`;

const AccordionTitle = styled.button`
  padding: 6px 10px;
  color: var(--main-color, #fff);
  font-size: 14px;
  font-weight: 100;
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

const RegionTitle = styled.div`
  font-weight: 600;
  padding: 8px 10px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: var(--card-bg-3, #3a3a3c);
    border-radius: 6px;
  }
`;

const LocationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 10px;
  margin-bottom: 20px;
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

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
`;

const LocationsObjectsAccordion = ({ onChange, initialValue = [] }) => {
  const { data: locationsList } = useGetLocationsQuery();

  // Format locations to include parent region in the title
  const formatLocations = () => {
    const locList = Array.isArray(locationsList)
      ? locationsList
      : locationsList
      ? Object.values(locationsList)
      : [];

    return locList.map(({ id, id_parent, name }) => {
      return handleGetLocationAllPath(locList, id, id_parent, name);
    });
  };

  const formattedLocations = locationsList ? formatLocations() : [];

  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(initialValue);

  const toggleAccordion = () => setIsActive(!isActive);

  const handleToggleRegion = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];
    setSelected(updated);
    if (onChange) onChange(updated);
  };

  const handleSelectGroup = (ids) => {
    const hasAll = ids.every((id) => selected.includes(id));
    const updated = hasAll
      ? selected.filter((id) => !ids.includes(id))
      : [...new Set([...selected, ...ids])];
    setSelected(updated);
    if (onChange) onChange(updated);
  };

  const handleClear = () => {
    setSelected([]);
    if (onChange) onChange([]);
  };

  const selectOptions = formattedLocations
    .filter((loc) => !selected.includes(loc.value))
    .map((loc) => ({
      value: loc.value,
      title: loc.title, // This will now be in "City => Region" format
    }));

  const selectedTitles = formattedLocations
    .filter((loc) => selected.includes(loc.value))
    .map((loc) => loc.title);

  const displayTitle =
    selectedTitles.length === 0
      ? "Локації"
      : selectedTitles.length > 3
      ? `${selectedTitles.slice(0, 3).join(", ")} +${selectedTitles.length - 3}`
      : selectedTitles.join(", ");

  return (
    <AccordionWrapper>
      <AccordionItem>
        <AccordionTitle
          onClick={toggleAccordion}
          className={isActive ? "open" : ""}
        >
          <span>{displayTitle}</span>
          <Arrow active={isActive} className="main-arrow" />
        </AccordionTitle>
        <AccordionContent active={isActive}>
          <div style={{ marginBottom: "10px" }}>
            <Select
              options={selectOptions}
              onChange={handleToggleRegion}
              placeholder="Я шукаю місто..."
              isSearch
              hideArrowDefault
              closeOnBlur
              closeOnSelect
              noOverlay
            />
          </div>

          <BadgesContainer>
            {formattedLocations
              .filter((loc) => selected.includes(loc.value))
              .map((loc) => (
                <Tag
                  key={loc.value}
                  onRemove={() => handleToggleRegion(loc.value)}
                  title={loc.title}
                />
              ))}
          </BadgesContainer>

          <ClearButton onClick={handleClear} disabled={selected.length === 0}>
            Очистити всі
          </ClearButton>

          {data.map((group) => (
            <div key={group.region}>
              <RegionTitle
                onClick={() =>
                  handleSelectGroup(group.locations.map((l) => l.value))
                }
              >
                {group.region}
              </RegionTitle>
              <LocationsContainer>
                {group.locations.map((loc) => {
                  // Find the formatted location title
                  const formattedLoc = formattedLocations.find(
                    (l) => l.value === loc.value
                  );
                  return (
                    <CheckOption
                      key={loc.value}
                      label={formattedLoc ? formattedLoc.title : loc.title}
                      value={selected.includes(loc.value) ? "1" : "0"}
                      onChange={() => handleToggleRegion(loc.value)}
                      className="gap-2"
                    />
                  );
                })}
              </LocationsContainer>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </AccordionWrapper>
  );
};

export default LocationsObjectsAccordion;
