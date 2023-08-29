import { styled } from "styled-components";
import { ObjectCard } from "./ObjectCard/ObjectCard";
import objectPhoto from "../../../../../../assets/images/object.png";

export const List = () => {
  return (
    <StyledList className="flex items-center hide-scroll">
      <ObjectCard photo={objectPhoto} />
      <ObjectCard photo={objectPhoto} />
      <ObjectCard />
      <ObjectCard />
    </StyledList>
  );
};

const StyledList = styled.div`
  width: 185px;
  overflow: auto;
`;
