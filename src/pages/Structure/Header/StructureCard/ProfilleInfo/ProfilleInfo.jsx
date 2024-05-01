import styled from "styled-components";
import { Header } from "./Header/Header";
import { Divider } from "./Divider";
import { Phones } from "../../../../../components/Phones/Phones";
import { Email } from "./Email";
import bg from "../../../../../assets/images/profile-bg.png";
import {
  useGetBannersQuery,
  useGetPhonesCodesQuery,
} from "../../../../../store/auth/auth.api";

export const ProfilleInfo = ({ onOpenInfo, data }) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const { data: bannersData } = useGetBannersQuery();

  return (
    <StyledProfilleInfo
      bg={bannersData?.data[data?.id_baner]?.url ?? bannersData?.data[1]?.url}
      className="notClickable"
    >
      <Header onOpenInfo={onOpenInfo} data={data} />
      <Divider />
      <Phones
        className="phone-wrap "
        classNameContent={`phones-wrapper notClickable ${
          JSON.parse(data?.phone)?.length === 1 && "onePhone"
        }`}
        phones={
          !data?.phone
            ? []
            : JSON.parse(data?.phone)?.map(
                ({ id_phone_code, phone, code, viber, telegram }) => ({
                  phone: `${
                    code ??
                    phonesCodes?.find(({ id }) => id === id_phone_code)?.code ??
                    ""
                  }${phone}`,
                  viber,
                  telegram,
                })
              )
        }
      />
      <Email email={data?.email ?? ""} />
    </StyledProfilleInfo>
  );
};

const StyledProfilleInfo = styled.div`
  border-radius: 10px;
  background: var(--bg-80);
  padding: 14px 10px 12px 51px;
  width: 316px;
  height: 220px;
  position: relative;
  margin-right: 10px;
  .phones-wrap {
    overflow: hidden;
    width: 280px;
  }
  .onePhone {
    width: 300px;
  }
  .phones-wrapper {
    overflow: hidden;
    width: 240px;
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
    .phones-wrapper {
      width: 100%;
      overflow: hidden;
    }
  }
  @media (min-width: 1400px) {
    width: 280px;
    .phones-wrapper {
      overflow: hidden;
      width: 95px;
    }
    .onePhone {
      width: 120px;
    }
  }
  @media (min-width: 1600px) {
    width: 316px;
    .phones-wrapper {
      overflow: hidden;
      width: 130px;
    }
    .onePhone {
      width: 150px;
    }
  }
`;
