import { styled } from "styled-components";
import linkIcon from "../assets/images/link.svg";
import checkIcon from "../assets/images/circle-green-check.svg";
import { useState } from "react";

export const CopyLink = ({ className }) => {
  const [active, setActive] = useState(false);

  const handleCopy = () => {
    setActive(true);
    setTimeout(() => setActive(false), 1500);
  };

  return (
    <StyledCopyLink
      className={`flex flex-col items-center justify-center ${className} ${
        active && "active"
      }`}
      onClick={() => (active ? null : handleCopy())}
    >
      <img src={checkIcon} alt="" className="check-icon" />
      <img src={linkIcon} alt="" className="link-icon" />
    </StyledCopyLink>
  );
};

const StyledCopyLink = styled.button`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 9px !important;
  transition: all 0.3s;
  .check-icon {
    height: 0px;
  }
  .check-icon,
  .link-icon {
    transition: all 0.3s;
  }
  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    border: 1.4px solid #81fb21;
    .check-icon {
      height: 18px;
    }
    .link-icon {
      height: 0;
    }
  }
`;
