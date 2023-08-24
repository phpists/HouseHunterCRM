import { styled } from "styled-components";

export const Button = ({ title, onClick, icon, outline, className }) => (
  <StyledButton
    onClick={onClick}
    className={`flex items-center justify-center ${className}`}
    outline={outline}
  >
    <span>{title}</span>
    {icon && (
      <div className="icon">
        <img src={icon} alt="" className="ml-1" />
      </div>
    )}
  </StyledButton>
);

const StyledButton = styled.button`
  padding: 8px 17px 6px;
  border-radius: 6px;
  ${({ outline }) =>
    outline === "true" ? "border: 1.6px solid #FFF;" : "  background: #fff;"}
  height: 32px;
  color: ${({ outline }) => (outline === "true" ? "#FFF" : "#2c2c2c")};
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 118%;
  letter-spacing: 0.3px;
  transition: all 0.3s;
  .icon {
    width: 0;
    overflow: hidden;
    transition: all 0.3s;
  }
  img {
    width: 18px;
    height: 18px;
  }
  &:hover {
    color: #2c2c2c;
    background: #fff;
  }
  &:hover > .icon {
    width: 22px;
  }
  &:active {
    background: #c3c3c3;
    border: none;
  }
`;
