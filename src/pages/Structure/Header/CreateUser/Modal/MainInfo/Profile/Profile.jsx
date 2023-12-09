import styled from "styled-components";
import { LastDate } from "./LastDate";
import { Avatar } from "./Avatar";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { RoleSelect } from "./RoleSelect/RoleSelect";

export const Profile = ({ data, onChangeField, errors }) => (
  <StyledProfile>
    <LastDate />
    <div className="flex items-center">
      <Avatar
        photo={data?.photo?.url}
        onChange={(val) =>
          onChangeField("photo", { file: val, url: URL.createObjectURL(val) })
        }
        level={data?.id_permision}
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Title firstName={data?.first_name} lastName={data?.last_name} />
          <RoleSelect
            value={data?.id_permision}
            onChange={(val) => onChangeField("id_permision", val)}
            error={!!errors?.find((e) => e === "id_permision")}
          />
        </div>
        {/* <Subtitle /> */}
      </div>
    </div>
  </StyledProfile>
);

const StyledProfile = styled.div`
  padding: 6px 10px;
`;
