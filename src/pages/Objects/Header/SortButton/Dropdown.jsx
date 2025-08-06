import { styled } from "styled-components";
import { useGetSortObjectViewQuery } from "../../../../store/objects/objects.api";
import { Option } from "../../../../components/Option";

export const Dropdown = ({ value, onChange, open }) => {
  const { data: sortData } = useGetSortObjectViewQuery();

  return (
    <StyledDropdown className="dropdown" open={open}>
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
  background: var(
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.9)
  ); /* Fallback for backdrop-filter */
  -webkit-backdrop-filter: blur(18.5px); /* Safari prefix */
  backdrop-filter: blur(18.5px);
  color: var(--main-color, #333);
  font-family: Overpass, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 300; /* Use numeric font-weight */
  line-height: 118%;
  letter-spacing: 0.3px;
  z-index: 56;
  overflow-y: auto;
  max-height: 200px;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  /* Ensure scrollbar visibility in Safari */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--main-color, #888);
    border-radius: 4px;
  }
`;
