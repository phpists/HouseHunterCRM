import { styled } from "styled-components";
import { ReactComponent as Arrow } from "../../../assets/images/arrow-right.svg";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <StyledBackButton
      className="flex items-center justify-center"
      //   onClick={() => navigate(-1)}
    >
      <Arrow />
    </StyledBackButton>
  );
};

const StyledBackButton = styled.button`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 5px;
  transition: all 0.3s;
  backdrop-filter: blur(18.5px);
  cursor: pointer;
  margin: 0 10px 3px 0;
  flex-shrink: 0;
  g {
    opacity: 1;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  &:active {
    background: rgba(255, 255, 255, 0.4);
  }
  @media (max-width: 800px) {
    display: none;
  }
`;
