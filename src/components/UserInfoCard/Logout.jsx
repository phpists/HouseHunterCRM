import styled from "styled-components";
import { Button } from "../Button";
import { useLazyLogoutQuery } from "../../store/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/actions";

export const Logout = () => {
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
  const { loginUser } = useActions();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/auth");
    loginUser(null);
  };

  return (
    <StyledLogout>
      <Button title="Вийти" onClick={handleLogout} className="btn enter-btn" />
    </StyledLogout>
  );
};

const StyledLogout = styled.div`
  margin-top: 10px;
  .btn {
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.3px;
    padding: 7px 20px 6px 20px;
    height: 31px;
    width: 100%;
    flex-shrink: 1;
    color: #ff4343;
    background: rgba(255, 67, 67, 0.3);
    &:hover {
      background: rgba(255, 67, 67, 0.4);
    }
  }
`;
