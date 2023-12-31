import styled from "styled-components";
import { Header } from "./Header/Header";
import { Divider } from "./Divider";
import { Phones } from "../../../../../components/Phones/Phones";
import { Email } from "./Email";
import bg from "../../../../../assets/images/profile-bg.png";
import { useGetPhonesCodesQuery } from "../../../../../store/auth/auth.api";

export const ProfilleInfo = ({ onOpenInfo, data }) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  return (
    <StyledProfilleInfo bg={bg} className="notClickable">
      <Header onOpenInfo={onOpenInfo} data={data} />
      <Divider />
      <Phones
        className="phones-wrapper notClickable"
        phones={JSON.parse(data?.phone)?.map(
          ({ id_phone_code, phone, code }) =>
            `${
              code ??
              phonesCodes?.find(({ id }) => id === id_phone_code)?.code ??
              ""
            }${phone}`
        )}
      />
      <Email email={data?.email ?? ""} />
    </StyledProfilleInfo>
  );
};

const StyledProfilleInfo = styled.div`
  border-radius: 10px;
  background: rgba(50, 50, 50, 0.8);
  padding: 14px 10px 12px 51px;
  width: 316px;
  height: 220px;
  position: relative;
  margin-right: 10px;
  .phones-wrapper {
    grid-template-columns: 1fr max-content !important;
    margin-bottom: 4px;
    width: 100%;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 100%;
    background: url(${({ bg }) => bg}) center/cover no-repeat;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (max-width: 850px) {
    height: auto;
  }
  @media (min-width: 1400px) {
    width: 280px;
  }
  @media (min-width: 1600px) {
    width: 316px;
  }
`;
