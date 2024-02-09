import { styled } from "styled-components";

export const InfoText = ({ text, onClick, className }) => (
  <StyledInfoText
    className={`flex items-center justify-end ${className}`}
    onClick={onClick}
  >
    <span>{text}</span>
  </StyledInfoText>
);

const StyledInfoText = styled.div`
  text-align: center;
  margin-top: 20px;
  span {
    color: #fff;
    text-align: center;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    opacity: 0.4;
    position: relative;
    cursor: pointer;
    width: max-content;
    transition: all 0.3s;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 100%;
      width: 0%;
      height: 1.2px;
      background: #9747ff;
      transition: all 0.3s;
    }
    &:hover {
      color: #9747ff;
      opacity: 1;
      &::before {
        width: 100%;
      }
    }
  }
`;
