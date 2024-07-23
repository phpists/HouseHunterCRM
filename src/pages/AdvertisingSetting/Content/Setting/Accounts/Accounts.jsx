import styled from "styled-components";
import { Card } from "./Card";
import { handleFormatDate } from "../../../../../utilits";

export const Accounts = ({ accounts }) => (
  <StyledAccounts>
    {accounts?.map(({ TokenExpires, data }) => (
      <Card
        expireAt={handleFormatDate(Number(TokenExpires) * 1000)}
        email={data?.email}
        id={data?.id}
        name={data?.name?.length > 0 ? data?.name : null}
      />
    ))}
  </StyledAccounts>
);

const StyledAccounts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-top: 20px;
`;
