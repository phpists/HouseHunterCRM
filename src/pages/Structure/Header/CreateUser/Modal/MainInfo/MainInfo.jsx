import styled from "styled-components";
import { Profile } from "./Profile/Profile";
import { Divider } from "../Divider";
import { BossSelect } from "../../../../../../components/BossSelect/BossSelect";

export const MainInfo = ({ data, onChangeField, users = [], errors }) => {
  return (
    <StyledMainInfo>
      <Profile data={data} onChangeField={onChangeField} errors={errors} />
      {users?.length > 0 ? (
        <>
          <Divider />
          <BossSelect
            users={users}
            value={data?.structure_parent}
            onChange={(val) => onChangeField("structure_parent", val)}
            error={!!errors?.find((e) => e === "structure_parent")}
          />
        </>
      ) : null}
      {/* 
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
  background: var(--bg-10);
  margin-bottom: 15px;
`;
