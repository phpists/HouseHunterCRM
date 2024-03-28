import styled from "styled-components";
import { Phones } from "../../../../Phones/Phones";
import { ShowButton } from "./ShowButton";
import { useGetPhonesCodesQuery } from "../../../../../store/auth/auth.api";

export const Phone = ({ commentOpen, phones, error, onShow }) => {
  const { data } = useGetPhonesCodesQuery();

  return (
    <StyledPhone className="clickable">
      {phones && !error ? (
        <Phones
          className={`${commentOpen ? "" : "phones"} ${
            phones?.length > 1
              ? "phones-object-wrapper-many"
              : "phones-object-wrapper"
          }`}
          classNameContent={
            phones?.length > 1 ? "phones-wrap-many" : "phones-wrap"
          }
          phones={phones?.map(
            ({ id_phone_code, phone, code, telegram, viber }) => ({
              phone: `${
                code ?? data?.find(({ id }) => id === id_phone_code)?.code ?? ""
              }${phone}`,
              telegram,
              viber,
            })
          )}
          hideIcon
        />
      ) : (
        <ShowButton
          onClick={onShow}
          className={commentOpen ? "" : "mt-2.5 "}
          error={error}
          title={error ? "Доступ заборонено" : "Показати контакти"}
        />
      )}
    </StyledPhone>
  );
};

const StyledPhone = styled.div`
  .phones-wrap {
    width: 100px;
  }
  .phones-wrap-many {
    width: 80px;
  }
  .phones-object-wrapper .phone {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .phones-object-wrapper-many .phone {
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
