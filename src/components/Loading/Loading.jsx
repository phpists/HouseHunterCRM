import styled from "styled-components";
import { Progress } from "./Progress";
import logo from "../../assets/images/full-logo.svg";
import bg from "../../assets/images/loading.svg";

export const Loading = ({ load }) => (
  <StyledLoading className="flex flex-col justify-center items-center" bg={bg}>
    <img src={logo} alt="logo" className="main-loading-logo" />
    <Progress load={load} />
  </StyledLoading>
);

const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: url(${({ bg }) => bg}) center/contain no-repeat, var(--main-bg);
  .main-loading-logo {
    height: 50px;
  }
`;
