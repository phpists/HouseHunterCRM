import { useState } from "react";
import { styled } from "styled-components";
import { Tag } from "./Tag";
import { Count } from "./Count";
import { motion } from "framer-motion";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";

export const TagsFilter = ({
  label,
  search,
  className,
  noEdit,
  tags,
  onChange,
  error,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleAddTag = (e) => {
    if (e.keyCode === 13) {
      onChange([...tags, value]);
      setValue("");
    }
  };

  const handleRemoveTag = (index) =>
    onChange(tags.filter((t, i) => i !== index));

  return (
    <StyledTagsFilter
      empty={tags?.length === 0}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={`${isActive && "active"} ${className} ${
        error && "error-field"
      }`}
      search={search}
      noEdit={noEdit}
    >
      <div className="flex items-center justify-between">
        <div className="tags-wrapper flex flex-wrap">
          {tags?.slice(0, isActive ? tags.length : 2)?.map((tag, i) => (
            <Tag
              key={i}
              title={tag}
              onRemove={() => handleRemoveTag(i)}
              isHide={!isActive && i > 2}
              noEdit={noEdit}
            />
          ))}
          {!isActive && tags?.length > 2 && (
            <Count count={tags?.slice(2).length} />
          )}
          {!(tags?.length > 0 && !isActive) && !noEdit && (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              type="text"
              placeholder={
                search && tags?.length === 0 ? label : "Почніть писати"
              }
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleAddTag}
            />
          )}
        </div>
        {search && tags?.length === 0 && <SearchIcon className="search-icon" />}
      </div>
      {search && tags?.length === 0 ? null : (
        <div className="label">{label}</div>
      )}
    </StyledTagsFilter>
  );
};

const StyledTagsFilter = styled.div`
  padding: 6px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  &.error-field {
    border: red 1px solid;
  }
  input {
    color: #fff;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    transition: all 0.3s;
    width: 100%;
    &::placeholder {
      color: #fff;
      font-family: Overpass;
      font-size: 15px;
      font-style: normal;
      font-weight: 200;
      line-height: 118%; /* 17.7px */
      letter-spacing: 0.3px;
      opacity: 0.6;
    }
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }

  .tags-wrapper {
    width: 100%;
    margin-bottom: ${({ empty, search }) =>
      empty && search ? 0 : empty ? 1 : 4}px;
    ${({ empty }) =>
      !empty &&
      `
        gap: 4px 0px;
    `}
  }

  &:hover,
  &.active {
    ${({ noEdit }) =>
      !noEdit &&
      `
        background: rgba(255, 255, 255, 0.05);
        input {
        &::placeholder {
            opacity: 1;
        }
        }
    
    `}
  }

  ${({ empty }) => !empty && "background: rgba(255, 255, 255, 0.05);"}
`;
