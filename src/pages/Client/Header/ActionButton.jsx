import { styled } from "styled-components";

export const ActionButton = ({ title, onClick, className }) => (
  <StyledActionButton className={`${className}`} onClick={onClick}>
    {title}
  </StyledActionButton>
);

const StyledActionButton = styled.div`
  padding: 8px 18px 6px 17px;
  border-radius: 8px;
  border: 1.4px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    opacity: 1;
  }
`;
