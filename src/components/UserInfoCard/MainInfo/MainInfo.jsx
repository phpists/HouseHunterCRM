import styled from "styled-components";
import { Profile } from "./Profile/Profile";
import { Divider } from "../Divider";
import { LoginAllow } from "./LoginAllow";
import { StatusCard } from "./StatusCard";
import { AvatarBanner } from "./AvatarBanner";
import { BossSelect } from "../../../components/BossSelect/BossSelect";

export const MainInfo = ({
  avatarBanner,
  data,
  onChangeField,
  onRefreshData,
  isProfile,
  profile,
  billingTo,
  onRemoveAvatar,
  bosses = [],
  errors = [],
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
        onRemoveAvatar={onRemoveAvatar}
      />
      {bosses?.length > 0 && data?.structure_level ? (
        <>
          <Divider />
          <BossSelect
            users={bosses}
            value={data?.structure_parent}
            onChange={(val) => onChangeField("structure_parent", val)}
            error={!!errors?.find((e) => e === "structure_parent")}
          />
        </>
      ) : null}

      {isProfile ? null : (
        <>
          {!profile && (
            <>
              <Divider />
              <LoginAllow
                active={data?.active === "1"}
                onChange={() =>
                  onChangeField("active", data?.active === "1" ? "0" : "1")
                }
              />
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
