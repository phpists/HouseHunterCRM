import { styled } from "styled-components";
import { Info } from "./Info";
import { Divider } from "./Divider";
import { List } from "./List/List";

export const Objects = ({ requestsCount, objectsCount }) => {
  return (
    <StyledObjects className="flex items-center">
      <Info requestsCount={requestsCount} objectsCount={objectsCount} />
      {/* <Divider /> */}
      {/* <List /> */}
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  border-radius: 6px;
  background: var(--dark-card-bg);
  padding: 5px;
  margin-right: 24px;
  @media (max-width: 1399.5px) {
    margin: 0;
  }
`;
