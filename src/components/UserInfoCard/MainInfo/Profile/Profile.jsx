import styled from "styled-components";
import { LastDate } from "./LastDate";
import { Avatar } from "./Avatar";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { RoleSelect } from "./RoleSelect/RoleSelect";

export const Profile = ({ data, onChangeField, onRefreshData }) => (
  <StyledProfile>
    <LastDate data={data?.last_active ?? ""} />
    <div className="flex items-center">
      <Avatar
        photo={data?.photo}
        onChangeField={onChangeField}
        onRefreshData={onRefreshData}
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Title title={`${data?.first_name ?? ""} ${data?.last_name ?? ""}`} />
          <RoleSelect />
        </div>
        <Subtitle />
      </div>
    </div>
  </StyledProfile>
);

const StyledProfile = styled.div`
  padding: 6px 10px;
`;
