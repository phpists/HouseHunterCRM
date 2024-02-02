import { styled } from "styled-components";
import { Option } from "../Option";

export const Dropdown = ({
  open,
  notMultiSelect,
  Component,
  options,
  onChange,
  activeValue,
  search,
  tags = [],
}) => (
  <StyledDropdown className="tagsSelectDropdown">
    {options?.length
      ? options
          .filter(({ title }) =>
            search?.length > 0
              ? title?.toLowerCase()?.includes(search.toLowerCase())
              : true
          )
          .map(({ title, value }, i) => (
            <Option
              key={i}
              title={title}
              className="opt"
              noSelect={notMultiSelect}
              Component={Component}
              onSelect={() => onChange(value, title)}
              active={
                activeValue === value || tags?.find((t) => t.value === value)
              }
            />
          ))
      : null}
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 1px);
  width: 100%;
  left: 0;
  background: #4b4b4b;
  border-radius: 0 0 9px 9px;
  overflow: auto;
  z-index: 101;
  max-height: 250px;
  visibility: hidden;
  opacity: 0;
  .opt {
    padding: 8px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
  }
`;
