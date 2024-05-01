import { styled } from "styled-components";

export const Dropdown = () => (
  <StyledDropdown className="dropdown">
    <div>Агент</div>
    <div>Трутень</div>
    <div className="create">Створити</div>
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  color: #58afff;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
  text-transform: uppercase;
  transition: all 0.3s;
  opacity: 0;
  visibility: hidden;
  text-align: left;
  div {
    padding: 4px 8px 1px;
    background: rgba(88, 175, 255, 0.3);
    border-top: 1px solid rgba(88, 175, 255, 0.1);
  }
  .create {
    color: var(--main-color);
    border-radius: 0 0 7px 7px;
  }
`;
