import styled from "styled-components";
import { Profile } from "./Profile/Profile";
import { Divider } from "../Divider";
import { LoginAllow } from "./LoginAllow";
import { StatusCard } from "./StatusCard";
import { AvatarBanner } from "./AvatarBanner";
import { BossSelect } from "../../../components/BossSelect/BossSelect";
import { handleFormatDate } from "../../../utilits";

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
  noStructure,
  rolesOnlyView,
  userProfile,
}) => {
  return (
    <StyledMainInfo>
      {avatarBanner && (
        <AvatarBanner
          onChange={(val) => onChangeField("id_baner", val)}
          value={data?.id_baner}
        />
      )}
      <Profile
        data={data}
        onChangeField={onChangeField}
        onRefreshData={onRefreshData}
        isProfile={isProfile}
        profile={profile}
        onRemoveAvatar={onRemoveAvatar}
        noStructure={noStructure}
        rolesOnlyView={rolesOnlyView}
        userProfile={userProfile}
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
          {billingTo && !isNaN(billingTo) ? (
            <>
              <Divider />
              <StatusCard
                title={
                  new Date()?.getTime() < Number(billingTo) * 1000 ? (
                    <>
                      <span>Сплачено до</span>{" "}
                      {handleFormatDate(Number(billingTo) * 1000, true)}
                    </>
                  ) : (
                    <>Не сплачено</>
                  )
                }
                status={new Date()?.getTime() < Number(billingTo) * 1000}
                subtitle="Білінг"
              />
            </>
          ) : null}
        </>
      )}
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: var(--bg-10);
  margin-bottom: 15px;
`;
