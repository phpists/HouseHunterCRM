import { styled } from "styled-components";
import { ReactComponent as Arrow } from "../../../assets/images/arrow-right.svg";
import { useLocation, useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const handleBack = () => {
    if (search === "?objects") {
      navigate("/objects?prev=true");
    } else {
      navigate(-1);
    }
  };

  return (
    <StyledBackButton className="flex items-center" onClick={handleBack}>
      <button className="flex items-center justify-center">
        <Arrow />
      </button>
      Назад
    </StyledBackButton>
  );
};

const StyledBackButton = styled.button`
  color: #fff;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  cursor: pointer;
  button {
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    border-radius: 5px;
    transition: all 0.3s;
    backdrop-filter: blur(18.5px);
    cursor: pointer;
    margin: 0 8px 3px 0;
    flex-shrink: 0;
    margin-right: 10px;
    g {
      opacity: 1;
    }
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    &:active {
      background: rgba(255, 255, 255, 0.4);
    }
  }
  @media (max-width: 600px) {
    display: none;
  }
`;
