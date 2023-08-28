import { styled } from "styled-components";
import { ForgotPassword } from "./ForgotPassword/ForgotPassword";
import { Login } from "./Login/Login";
import { LoginMessage } from "./LoginMessage";
import { Registration } from "./Registration";
import { RegistrationMessage } from "./RegistrationMessage";
import { Shape } from "./Shape";

export const Content = ({
  type,
  onChangeType,
  isRightBlockHover,
  onChangeRightBlockHover,
  onSuccess,
  forgotPassword,
  onChangeForgotPassword,
  success,
}) => (
  <StyledContent
    success={success}
    forgotPassword={forgotPassword}
    type={type}
    ishover={isRightBlockHover}
  >
    <Shape
      ishover={isRightBlockHover}
      onChangeishover={(value) => onChangeRightBlockHover(value)}
      type={type}
    />
    <div className="left">
      {type === "registration" ? (
        <Registration onSuccess={() => onSuccess()} />
      ) : (
        <RegistrationMessage
          ishover={isRightBlockHover}
          onClick={() => onChangeType("registration")}
        />
      )}
    </div>
    <div
      className="right"
      onMouseEnter={() => onChangeRightBlockHover("true")}
      onMouseLeave={() => onChangeRightBlockHover("false")}
    >
      {type === "registration" ? (
        <LoginMessage onClick={() => onChangeType("login")} />
      ) : forgotPassword ? (
        <ForgotPassword onClose={() => onChangeForgotPassword(false)} />
      ) : (
        <Login
          onForgotPassword={() => onChangeForgotPassword(true)}
          onSuccess={() => onSuccess(true)}
        />
      )}
    </div>
  </StyledContent>
);

const StyledContent = styled.div`
  position: relative;
  min-height: 100svh;
  width: 100vw;
  transition: all 0.6s;
  ${({ success }) =>
    success &&
    "transform: translateX(200%); visibility: hidden; overflow: hidden;"}
  .left {
    position: absolute;
    transition: all, 0.5s;
    left: ${({ ishover, type }) =>
      type === "registration" ? 11 : ishover === "true" ? 18 : 20}svw;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.5s;
    right: ${({ forgotPassword, type }) =>
      type === "registration" ? 17 : forgotPassword ? 4 : 8}svw;
    z-index: 10;
  }
`;
