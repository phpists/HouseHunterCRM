import styled from "styled-components";
import { Breadcrumbs } from "./Breadcrumbs/Breadcrumbs";
import { CreateRole } from "./CreateRole/CreateRole";
import { CreateUser } from "./CreateUser/CreateUser";

export const Header = ({ level, onChangeLevel, onRefetchData }) => {
  return (
    <StyledHeader className="flex items-center justify-between">
      <Breadcrumbs level={level} onChangeLevel={onChangeLevel} />
      <div className="btns flex items-center">
        {level === 3 ? (
          <CreateUser small />
        ) : (
          <>
            <CreateUser onRefetchData={onRefetchData} />
            <CreateRole />
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
