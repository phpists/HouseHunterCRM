import { styled } from "styled-components";
import { ClientAvatar } from "../../../../../components/ClientAvatar";
import { Name } from "./Name";
import { Id } from "./Id";
import { CreatedAt } from "./CreatedAt";

export const MainInfo = () => {
  return (
    <StyledMainInfo className="flex items-center">
      <ClientAvatar type={1} />
      <div className="ml-3">
        <div className="flex items-center">
          <Name />
          <Id />
        </div>
        <CreatedAt />
      </div>
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  margin-right: 45px;
  flex-shrink: 0;
`;
