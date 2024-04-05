import styled from "styled-components";
import { Modal } from "../../../components/Modal/Modal";
import { useGetPhonesCodesQuery } from "../../../store/auth/auth.api";
import { Card } from "./Card";
import { handleFormatDate } from "../../../utilits";

export const PhoneHistory = ({ onClose, data }) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  return (
    <StyledPhoneHistory>
      <Modal title="Історія зміни контактів" onClose={onClose}>
        <div>
          {data?.map(({ code, phone, time }, i) => (
            <Card
              key={i}
              title={`${phonesCodes?.find((c) => c.id === code)?.code}${phone}`}
              date={handleFormatDate(Number(time) * 1000)}
            />
          ))}
        </div>
      </Modal>
    </StyledPhoneHistory>
  );
};

const StyledPhoneHistory = styled.div``;
