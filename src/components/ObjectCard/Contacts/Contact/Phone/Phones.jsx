import styled from "styled-components";
import { Phones } from "../../../../Phones/Phones";
import { useState } from "react";
import { ShowButton } from "./ShowButton";
import { useGetPhonesCodesQuery } from "../../../../../store/auth/auth.api";

export const Phone = ({ commentOpen, phones }) => {
  const { data } = useGetPhonesCodesQuery();
  const [show, setShow] = useState(false);

  return (
    <StyledPhone className="clickable">
      {show ? (
        <Phones
          className={commentOpen ? "" : "phones"}
          phones={phones?.map(
            ({ id_phone_code, phone, code }) =>
              `${
                code ?? data?.find(({ id }) => id === id_phone_code)?.code
              }${phone}`
          )}
        />
      ) : (
        <ShowButton
          onClick={() => setShow(true)}
          className={commentOpen ? "" : "mt-2.5 "}
        />
      )}
    </StyledPhone>
  );
};

const StyledPhone = styled.div`
  .phones {
    margin-top: 8px;
  }
`;
