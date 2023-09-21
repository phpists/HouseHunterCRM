import styled from "styled-components";
import { Profile } from "./Profile/Profile";
import { Divider } from "../Divider";
import { BossSelect } from "./BossSelect/BossSelect";
import { LoginAllow } from "./LoginAllow";
import { StatusCard } from "./StatusCard";
import { AvatarBanner } from "./AvatarBanner";

export const MainInfo = ({ avatarBanner }) => {
  return (
    <StyledMainInfo>
      {avatarBanner && <AvatarBanner />}
      <Profile />
      <Divider />
      <BossSelect />
      <Divider />
      <LoginAllow />
      <Divider />
      <StatusCard
        title={
          <>
            <span>Сплачено до</span> 28.07.2023
          </>
        }
        status={true}
        subtitle="Білінг"
      />
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
