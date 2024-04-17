import styled from "styled-components";
import fullScreen from "../../assets/images/fullScreen.svg";
import offScreen from "../../assets/images/smallScreen.svg";
import { useEffect, useState } from "react";

export const ToggleFullScreen = () => {
  const [open, setOpen] = useState(false);

  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleCheckIsFullScreen = () => setOpen(document.fullscreenElement);

  useEffect(() => {
    window.addEventListener("resize", handleCheckIsFullScreen);

    return () => window.addEventListener("resize", handleCheckIsFullScreen);
  }, []);

  return (
    <StyledToggleFullScreen onClick={handleToggleFullScreen}>
      <img src={open ? offScreen : fullScreen} alt="" />
    </StyledToggleFullScreen>
  );
};

const StyledToggleFullScreen = styled.div`
  margin-right: 20px;
  opacity: 0.5;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  img {
    width: 25px;
    height: 25px;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;
