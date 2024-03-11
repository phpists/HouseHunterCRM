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
          className={commentOpen ? "" : "phones"}
          phones={phones?.map(
            ({ id_phone_code, phone, code, telegram, viber }) => ({
              phone: `${
                code ?? data?.find(({ id }) => id === id_phone_code)?.code ?? ""
              }${phone}`,
              telegram,
              viber,
            })
          )}
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

const StyledPhone = styled.div``;
