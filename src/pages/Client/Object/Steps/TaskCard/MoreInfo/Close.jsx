import { styled } from "styled-components";

export const Close = ({ onClose }) => (
  <StyledClose onClick={onClose}>Згорнути</StyledClose>
);

const StyledClose = styled.button`
  padding: 8px 0px 6px;
  transition: all 0.3s;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  width: calc(100% + 20px);
  border-radius: 0px 0px 9px 9px;
  margin: 0 0 0 -10px;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
`;
