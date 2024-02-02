import { styled } from "styled-components";
import { Option } from "./Option";

export const Dropdown = ({ open, onChange, options }) => (
  <StyledDropdown className="hide-scroll select-none selectDropdown">
    {options?.map(({ title, value }, i) => (
      <Option key={i} title={title} onSelect={() => onChange(value)} />
    ))}
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  right: 0;
  background: #fff;
  border-radius: 0 0 6px 6px;
  max-height: 252px;
  overflow: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 5;
  scroll-behavior: smooth;
  opacity: 0;
  visibility: hidden;
`;
