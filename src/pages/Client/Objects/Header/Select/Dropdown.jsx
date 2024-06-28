import { styled } from "styled-components";

const OPTIONS = [
  { title: "Додати в улюблене", value: "favorite" },
  { title: "Видалити", value: "delete" },
];

export const Dropdown = ({ onSelect }) => (
  <StyledDropdown>
    {OPTIONS.map((opt, i) => (
      <div key={i} onClick={() => onSelect(opt.value)}>
        {opt.title}
      </div>
    ))}
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  background: var(--bg-20);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  backdrop-filter: blur(18.5px);
  div {
    color: var(--second-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    padding: 7px 12px 5px;
    transition: all 0.3s;
    cursor: pointer;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    &:hover {
      opacity: 1;
      background: var(--bg-10);
      color: var(--main-color);
    }
  }
  div:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
