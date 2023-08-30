import { styled } from "styled-components";
import { OpenContent } from "./OpenContent";

export const CancelButton = ({ active, onChangeActive, onClose }) => {
  return (
    <StyledCancelButton
      active={active}
      onClick={() => (active === "cancel" ? null : onChangeActive("cancel"))}
    >
      {active === "cancel" ? (
        <OpenContent
          onChangeActive={() => onChangeActive(null)}
          onClose={onClose}
        />
      ) : (
        <span>Закрити ведення</span>
      )}
    </StyledCancelButton>
  );
};

const StyledCancelButton = styled.div`
  padding: 14px 35px 11px;
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
  margin-right: 13px;
  flex-shrink: 0;
  width: max-content;
  &:hover {
    color: #ff5959;
    border: 1.6px solid #ea2c2c;
  }
  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  ${({ active }) =>
    active === "next" &&
    `
    width: 0;
    margin: 0;
    overflow: hidden;
    padding: 0;
    opacity: 0;
  `}
  ${({ active }) =>
    active === "cancel" &&
    `
    width: 100%;
    margin: 0;
    border: 1.6px solid #ea2c2c;
    padding: 0;
  `}
`;
