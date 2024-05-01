import { styled } from "styled-components";
import { Option } from "../../../../../../components/Option";

const OPTIONS = [
  { title: "Я", value: "me" },
  { title: "Власник", value: "owner" },
  { title: "Інший рієлтор", value: "others" },
];
export const Dropdown = ({ selected, onSelect }) => (
  <StyledDropdown className="dropdown">
    {OPTIONS.map(({ title, value }, i) => (
      <Option
        key={i}
        title={title}
        onChange={() => onSelect({ title, value })}
        active={!!selected?.find((v) => v.value === value)}
      />
    ))}
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  background: var(--bg-20);
  backdrop-filter: blur(18.5px);
  width: 220px;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  height: max-content;
  overflow: hidden;
`;
