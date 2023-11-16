import styled from "styled-components";
import { RoleCard } from "./RoleCard/RoleCard";
import { ReactComponent as UserCheckIcon } from "../../../../../../assets/images/user-check.svg";
import { ReactComponent as UserIcon } from "../../../../../../assets/images/user-icon.svg";
import {
  useGetAllPerimissionsQuery,
  useGetPerimissionDirectorQuery,
} from "../../../../../../store/structure/structure.api";
import { Empty } from "./Empty";

export const Roles = ({ level, levelData, onRefetchData }) => {
  const COLORS = ["#7ecefd", "#b1ff91", "#d0a0ff", "#7ecefd"];
  const { data: permissionsList } = useGetAllPerimissionsQuery();
  const { data: rolesPermission, refetch } = useGetPerimissionDirectorQuery();

  if (!permissionsList) {
    return null;
  }

  return (
    <StyledRoles>
      {/* <Empty /> */}
      {levelData[0]?.split(" - ")?.length > 0
        ? levelData[0]
            ?.split(" - ")
            ?.map((name, i) => (
              <RoleCard
                key={i}
                IconImg={UserCheckIcon}
                iconBg={`${COLORS[i]}17`}
                iconColor={COLORS[i]}
                title={name ?? "-"}
                subtitle={i === 0 ? "Повний доступ" : "Доступ з налаштуваннями"}
                permissionsList={permissionsList}
                initValues={
                  !rolesPermission || i === 0
                    ? []
                    : rolesPermission[`permission_structure_level_${1 + i}`]
                }
                idPermision={rolesPermission?.id_permision}
                level={1 + i}
                onRefetchData={refetch}
                noOpen={i === 0}
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
