import styled from "styled-components";
import { Phones } from "../../../../Phones/Phones";
import { ShowButton } from "./ShowButton";
import { useGetPhonesCodesQuery } from "../../../../../store/auth/auth.api";
import { handleAddPhoneMask } from "../../../../../utilits";

export const Phone = ({ commentOpen, phones, error, onShow }) => {
  const { data } = useGetPhonesCodesQuery();

  return (
    <StyledPhone className="clickable">
      {phones && !error ? (
        phones.map((phone) => (
          <Phones
            className={`${commentOpen ? "" : "phones"} phones-object-wrapper `}
            classNameContent={"phones-wrap"}
            phones={[
              {
                phone: `${
                  phone?.code ??
                  data?.find(({ id }) => id === phone?.id_phone_code)?.code ??
                  ""
                }${phone.phone}`,
                maskedPhone: handleAddPhoneMask(phone?.phone),
                telegram: phone?.telegram,
                viber: phone?.viber,
              },
            ]}
            hideIcon
            small
          />
        ))
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
  display: flex;
  flex-direction: column;
  gap: 5px;
  .phones-wrap {
    width: 153px;
  }
  .phones-wrap-many {
    width: 130px;
  }
  .phones-object-wrapper .phone {
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .phones-object-wrapper-many .phone {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
