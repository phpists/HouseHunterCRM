import { styled } from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";

export const More = () => {
  return (
    <StyledMore className="flex items-center more">
      <div className="relative">
        <Button />
        <Dropdown />
      </div>
      <div className="divider" />
    </StyledMore>
  );
};

const StyledMore = styled.div`
  position: relative;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;
  z-index: 2;
  &:hover {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
  .divider {
    width: 1.6px;
    height: 26px;
    background: #fff;
    opacity: 0.2;
    margin: 0 19px;
  }
`;
