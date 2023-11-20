import styled from "styled-components";
import { Profile } from "./Profile/Profile";
import { Divider } from "../Divider";
import { BossSelect } from "./BossSelect/BossSelect";
import { LoginAllow } from "./LoginAllow";
import { StatusCard } from "./StatusCard";
import { AvatarBanner } from "./AvatarBanner";
import { handleFormatDate } from "../../../utilits";

export const MainInfo = ({
  avatarBanner,
  data,
  onChangeField,
  onRefreshData,
  isProfile,
  profile,
  billingTo,
}) => {
  return (
    <StyledMainInfo>
      {avatarBanner && <AvatarBanner />}
      <Profile
        data={data}
        onChangeField={onChangeField}
        onRefreshData={onRefreshData}
        isProfile={isProfile}
        profile={profile}
      />
      {/* <BossSelect />
      <Divider /> */}
      {isProfile ? null : (
        <>
          {!profile && (
            <>
              <Divider />
              <LoginAllow />
            </>
          )}
          {billingTo && (
            <>
              <Divider />
              <StatusCard
                title={
                  <>
                    <span>Сплачено до</span> {billingTo}
                  </>
                }
                status={true}
                subtitle="Білінг"
              />
            </>
          )}
        </>
      )}
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
