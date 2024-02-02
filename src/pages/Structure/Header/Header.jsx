import styled from "styled-components";
import { Breadcrumbs } from "./Breadcrumbs/Breadcrumbs";
import { CreateRole } from "./CreateRole/CreateRole";
import { CreateUser } from "./CreateUser/CreateUser";
import { ToggleShowButton } from "./ToggleButton";
import { useGetAccessQuery } from "../../../store/auth/auth.api";
import { handleCheckAccess } from "../../../utilits";

export const Header = ({
  level,
  onChangeLevel,
  onRefetchData,
  onToggleShowNotStructureWorkers,
  showNotStructureWorkers,
  currentLevel,
  onRefetchStructureData,
  onCreatedUser,
}) => {
  const { data: accessData } = useGetAccessQuery();

  return (
    <StyledHeader className="flex items-center justify-between">
      <Breadcrumbs level={level} onChangeLevel={onChangeLevel} />
      <div className="btns flex items-center">
        {level >= 3 && handleCheckAccess(accessData, "structure", "add") ? (
          <CreateUser small onCreatedUser={onCreatedUser} />
        ) : (
          <>
            {handleCheckAccess(accessData, "structure", "add") && (
              <CreateUser onCreatedUser={onCreatedUser} />
            )}
            {handleCheckAccess(accessData, "structure", "edit") && (
              <CreateRole onRefetchStructureData={onRefetchStructureData} />
            )}
            {level === 1 && (
              <ToggleShowButton
                active={showNotStructureWorkers}
                onClick={onToggleShowNotStructureWorkers}
              />
            )}
          </>
        )}
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  @media (max-width: 850px) {
    display: none;
  }
`;
