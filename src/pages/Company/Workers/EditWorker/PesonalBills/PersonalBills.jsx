import { styled } from "styled-components";
import { Card } from "./Card";

export const PersonalBills = () => (
  <StyledPersonalBills>
    <Card type={true} />
    <div className="divider" />
    <Card type={true} />
    <div className="divider" />
    <Card type={false} />
    <div className="divider" />
    <Card type={false} />
    <div className="divider" />
    <Card type={true} />
    <div className="divider" />
  </StyledPersonalBills>
);

const StyledPersonalBills = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: var(--bg-10);
  margin-bottom: 15px;
  .divider {
    width: 100%;
    height: 1px;
    margin: 6.5px 0;
    background: var(--bg-10);
  }
`;
