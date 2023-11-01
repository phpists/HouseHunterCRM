import styled from "styled-components";
import { RoleCard } from "./RoleCard/RoleCard";
import { ReactComponent as UserCheckIcon } from "../../../../../../assets/images/user-check.svg";
import { ReactComponent as UserIcon } from "../../../../../../assets/images/user-icon.svg";
import { useGetAllPerimissionsQuery } from "../../../../../../store/structure/structure.api";
import { Empty } from "./Empty";

export const Roles = ({ data, onRefetchData }) => {
  const { data: permissionsList } = useGetAllPerimissionsQuery();

  return (
    <StyledRoles>
      {/* <Empty /> */}
      <RoleCard
        IconImg={UserCheckIcon}
        iconBg="rgba(88, 175, 255, 0.09)"
        iconColor="#58AFFF"
        title="Керівник"
        subtitle="Повний доступ"
        noOpen
      />
      {data?.length > 0
        ? data?.map(({ name, permission_list_json, id, color }, i) => (
            <RoleCard
              key={i}
              IconImg={UserCheckIcon}
              iconBg={`${color ?? "#7ECEFD"}17`}
              iconColor={color ?? "#7ECEFD"}
              title={name ?? "-"}
              subtitle="Доступ з налаштуваннями"
              permissionsList={permissionsList}
              initValues={permission_list_json}
              id={id}
              onRefetchData={onRefetchData}
            />
          ))
        : null}
    </StyledRoles>
  );
};

const StyledRoles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 9px;
  margin-bottom: 20px;
`;
