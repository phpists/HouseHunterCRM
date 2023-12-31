import { styled } from "styled-components";
import bg from "../../assets/images/auth-bg.png";
import { Logo } from "./Logo";
import { useState } from "react";
import { Content } from "./Content";
import { SuccessMessage } from "./SuccessMessage";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();
  const [isRightBlockHover, setIsRightBlockHover] = useState("false");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [type, setType] = useState("login");
  const [success, setSuccess] = useState(false);

  const handleSuccess = (isLogin) => {
    if (isLogin) {
      window.location = "/";
    } else {
      setSuccess(true);
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccess(false);
    setType("login");
  };

  return (
    <StyledAuth bg={bg}>
      <Logo success={success} />
      <div className="auth-content">
        {success && <SuccessMessage onClick={handleCloseSuccessMessage} />}
        <Content
          type={type}
          onChangeType={(value) => setType(value)}
          isRightBlockHover={isRightBlockHover}
          onChangeRightBlockHover={(value) => setIsRightBlockHover(value)}
          onSuccess={handleSuccess}
          forgotPassword={forgotPassword}
          onChangeForgotPassword={(value) => setForgotPassword(value)}
          success={success}
        />
      </div>
    </StyledAuth>
  );
};

const StyledAuth = styled.div`
  min-height: 100svh;
  width: 100vw;
  background: url(${({ bg }) => bg}) center/cover no-repeat;
  position: relative;
  overflow: hidden;
  .auth-content {
    position: relative;
    min-height: 100svh;
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    background: rgba(44, 44, 44, 0.5);
    backdrop-filter: blur(4.5px);
  }
  button {
    font-weight: 400;
  }
`;
