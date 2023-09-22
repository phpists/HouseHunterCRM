import styled from "styled-components";

export const Dropdown = () => (
  <StyledDropdown>
    <div>
      <span>18.09.2023 </span>
      <span>13:10</span>
    </div>
    <div>
      <span>18.09.2023 </span>
      <span>13:10</span>
    </div>
    <div>
      <span>18.09.2023 </span>
      <span>13:10</span>
    </div>
  </StyledDropdown>
);

const StyledDropdown = styled.div`
  width: 360px;
  color: rgba(255, 255, 255, 0.6);
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  border-radius: 0 0 9px 9px;
  overflow: hidden;
  z-index: 2;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 31px 6px 15px;
    background: rgba(50, 50, 50, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;
