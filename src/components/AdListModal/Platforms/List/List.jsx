import styled from "styled-components";
import { Card } from "./Card";
import flombuIcon from "../../../../assets/images/flombu.png";
import olxIcon from "../../../../assets/images/olx.png";
import { useGetStatusAccountQuery } from "../../../../store/objects/objects.api";

export const List = ({ data }) => {
  const { data: accounts } = useGetStatusAccountQuery();

  const handleGetOlxAccount = (id) =>
    accounts?.accounts?.find((a) => a.data?.id?.toString() === id)?.data;

  const handleGetOlxTitle = (data) =>
    data?.name ?? data?.phone ?? data?.email ?? data?.id;

  return (
    <StyledList>
      {data?.arr_adverst_object?.map(({ resource, id_user_olx }, i) => (
        <Card
          icon={resource === "olx" ? olxIcon : flombuIcon}
          title={
            resource === "olx"
              ? handleGetOlxTitle(handleGetOlxAccount(id_user_olx))
              : ""
          }
        />
      ))}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;
  .empty {
    color: var(--dark-90);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 4px;
    a {
      color: var(--main-color);
      font-weight: 500;
      margin-left: 10px;
      display: inline-block;
      text-decoration: underline;
    }
  }
`;
