import styled from "styled-components";
import { ReactComponent as FullScreen } from "../../assets/images/fullScreen.svg";
import { ReactComponent as OffScreen } from "../../assets/images/smallScreen.svg";
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
    <StyledToggleFullScreen
      onClick={handleToggleFullScreen}
      className="flex items-center justify-center"
    >
      {open ? <OffScreen /> : <FullScreen />}
    </StyledToggleFullScreen>
  );
};

const StyledToggleFullScreen = styled.div`
  margin: 0 10px;
  opacity: 0.5;
  transition: all 0.3s;
  cursor: pointer;
  height: 32px;
  width: 32px;
  border-radius: 8px;
  padding: 6px;
  background: var(--full-screen-toggle-bg);
  &:hover {
    opacity: 1;
  }
  svg {
    width: 20px;
    height: 20px;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;
