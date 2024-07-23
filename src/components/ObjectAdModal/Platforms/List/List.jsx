import styled from "styled-components";
import { Card } from "./Card";
import olxIcon from "../../../../assets/images/olx.png";
import { useGetStatusAccountQuery } from "../../../../store/objects/objects.api";

export const List = ({ data, onChange }) => {
  const { data: accounts } = useGetStatusAccountQuery();

  return (
    <StyledList>
      {accounts?.accounts?.map((account, i) => (
        <Card
          key={i}
          icon={olxIcon}
          title={
            account?.data?.name ??
            account?.data?.phone ??
            account?.data?.email ??
            account?.data?.id
          }
          onClick={() =>
            onChange(
              "id_user_olx",
              data?.id_user_olx?.includes(account?.data?.id)
                ? data?.id_user_olx.filter((id) => id !== account?.data?.id)
                : [...data?.id_user_olx, account?.data?.id]
            )
          }
          active={data?.id_user_olx?.includes(account?.data?.id)}
        />
      ))}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;
`;
