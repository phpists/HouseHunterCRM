import styled from "styled-components";
import { useGetSortObjectViewQuery } from "../../../../store/objects/objects.api";
import { Option } from "../../../../components/Option";

export const Dropdown = ({ value, onChange }) => {
  const { data: sortData } = useGetSortObjectViewQuery();

  return (
    <StyledDropdown className="dropdown">
      {sortData?.map(({ id, name }) => (
        <Option
          key={id}
          title={name}
          onSelect={() => onChange(id?.toString())}
          active={value === id?.toString()}
        />
      ))}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  border-radius: 8px;
  background: var(--bg-10);
  backdrop-filter: blur(18.5px);
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 118%;
  letter-spacing: 0.3px;
  z-index: 56;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  max-height: 200px;
  overflow: auto;
`;
