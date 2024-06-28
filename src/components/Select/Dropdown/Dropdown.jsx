import { styled } from "styled-components";
import { Option } from "./Option";

export const Dropdown = ({ open, onChange, options, editValue }) => (
  <StyledDropdown className="hide-scroll select-none selectDropdown">
    {options?.length === 0 && editValue ? null : options?.length === 0 ? (
      <div className="empty-select">Пусто</div>
    ) : (
      options?.map(({ title, value }, i) => (
        <Option key={i} title={title} onSelect={() => onChange(value)} />
      ))
    )}
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  right: 0;
  background: var(--active-bg);
  border-radius: 0 0 6px 6px;
  max-height: 230px;
  overflow: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 100;
  scroll-behavior: smooth;
  visibility: hidden;
  opacity: 0;
  .empty-select {
    padding: 10px;
    text-align: center;
    color: #2c2c2c;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
`;
