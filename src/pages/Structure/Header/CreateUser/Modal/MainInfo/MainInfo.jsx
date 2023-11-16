import styled from "styled-components";
import { Profile } from "./Profile/Profile";
import { Divider } from "../Divider";
import { BossSelect } from "./BossSelect/BossSelect";
import { LoginAllow } from "./LoginAllow";
import { StatusCard } from "./StatusCard";

export const MainInfo = ({ data, onChangeField }) => {
  return (
    <StyledMainInfo>
      <Profile data={data} onChangeField={onChangeField} />
      {/* <Divider /> */}
      {/* <BossSelect />
      <Divider />
      <LoginAllow /> */}
      {/* <Divider />
      <StatusCard title="Потребує оплати" status={false} subtitle="Білінг" /> */}
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
