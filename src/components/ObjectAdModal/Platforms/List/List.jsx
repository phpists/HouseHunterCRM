import styled from "styled-components";
import { Card } from "./Card";
import olxIcon from "../../../../assets/images/olx.png";
import { useGetStatusAccountQuery } from "../../../../store/objects/objects.api";
import { Link } from "react-router-dom";

export const List = ({ data, onChange }) => {
  const { data: accounts } = useGetStatusAccountQuery();

  return (
    <StyledList>
      {accounts?.accounts?.length > 0 ? (
        accounts?.accounts?.map((account, i) => (
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
        ))
      ) : (
        <div className="empty">
          <span>Потрібно</span>
          <Link to="/advertising-setting">авторизуватись</Link>
        </div>
      )}
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
