import { styled } from "styled-components";

export const NextStep = ({ active, onChangeActive }) => {
  return (
    <StyledNextStep
      className="flex items-center justify-center"
      onMouseEnter={() => onChangeActive("next")}
      onMouseLeave={() => onChangeActive(null)}
      active={active}
    >
      <span>{active === "next" ? "Перейти до 2 етапу" : "Етап 2"}</span>
    </StyledNextStep>
  );
};

const StyledNextStep = styled.div`
  padding: 14px 10px 11px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &:hover {
    color: #81fb21;
    border: 1.6px solid #2fa112;
  }
  ${({ active }) =>
    active === "cancel" &&
    `
    width: 0;
    margin: 0;
    overflow: hidden;
    padding: 0;
    opacity: 0;
  `}
`;
