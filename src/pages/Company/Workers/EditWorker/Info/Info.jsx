import { styled } from "styled-components";
import { LoginAllow } from "./LoginAllow";
import { PaidToDate } from "./PaidToDate";
import { RegistationDate } from "./RegistationDate";
import { LoginDate } from "./LoginDate";

export const Info = () => {
  return (
    <StyledInfo>
      <LoginAllow />
      <div className="divider" />
      <PaidToDate />
      <div className="divider" />
      <div className="flex items-center">
        <RegistationDate />
        <LoginDate />
      </div>
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
  .divider {
    width: 100%;
    height: 1px;
    margin: 6.5px 0;
    background: rgba(255, 255, 255, 0.1);
  }
`;
