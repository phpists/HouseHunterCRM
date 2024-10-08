import styled from "styled-components";
import { LastDate } from "./LastDate";
import { Avatar } from "./Avatar";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { RoleSelect } from "./RoleSelect/RoleSelect";

export const Profile = ({
  data,
  onChangeField,
  onRefreshData,
  isProfile,
  profile,
  onRemoveAvatar,
  rolesOnlyView,
  noStructure,
  userProfile,
}) => (
  <StyledProfile>
    <LastDate data={data?.last_active ?? ""} />
    <div className="flex items-center">
      <Avatar
        photo={data?.photo?.url ?? data?.photo}
        onChangeField={onChangeField}
        onRefreshData={onRefreshData}
        onRemoveAvatar={onRemoveAvatar}
        level={data?.structure_level}
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Title
            title={`${data?.first_name ?? ""} ${data?.last_name ?? ""}`}
            isProfile={userProfile}
          />
          {profile ? null : (
            <RoleSelect
              isProfile={isProfile}
              value={data?.structure_level}
              onChange={(val) =>
                isProfile ? null : onChangeField("structure_level", val)
              }
              rolesOnlyView={rolesOnlyView}
              namePermission={data?.name_permision}
            />
          )}
        </div>
        {/* <Subtitle /> */}
      </div>
    </div>
  </StyledProfile>
);

const StyledProfile = styled.div`
  padding: 6px 10px;
`;
