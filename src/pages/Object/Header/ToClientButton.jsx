import { NavLink, useParams } from "react-router-dom";
import { styled } from "styled-components";

export const ToClientButton = () => {
  const { clientId } = useParams();

  return (
    <StyledToClientButton to={`/client/${clientId}`}>
      Перейти до клієнта
    </StyledToClientButton>
  );
};

const StyledToClientButton = styled(NavLink)`
  color: #fff;
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  padding: 8px 18px 6px 17px;
  border-radius: 8px;
  border: 1.4px solid rgba(255, 255, 255, 0.4);
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 21px;
  min-width: max-content;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    opacity: 1;
    border: 1px solid transparent;
  }
  @media (max-width: 800px) {
    font-size: 13px;
    padding: 8px 14px;
    margin-right: 15px;
  }
  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;