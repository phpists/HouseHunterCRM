import { styled } from "styled-components";
import bg from "../../assets/images/auth-bg.png";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { Content } from "./Content";
import { SuccessMessage } from "./SuccessMessage";
import { useLocation, useParams } from "react-router-dom";

const Auth = () => {
  const { search } = useLocation();
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

  const handleSaveId = (id) => {
    localStorage.setItem("referalId", id);
  };

  const handleCheckReferalId = () => {
    const referalId = search?.split("=")?.[1];

    if (referalId) {
      handleSaveId(referalId);
      setType("registration");
    }
  };

  useEffect(() => {
    handleCheckReferalId();
  }, [search]);

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
    background: var(--bg-5);
    backdrop-filter: blur(4.5px);
  }
  button {
    font-weight: var(--font-weight-light);
  }
`;

export default Auth;
