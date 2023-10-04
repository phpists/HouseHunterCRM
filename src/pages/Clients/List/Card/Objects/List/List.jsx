import { styled } from "styled-components";
import objectPhoto from "../../../../../../assets/images/object.png";
import { ObjectCard } from "../../../../../../components/ObjectCard";

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
  @media (max-width: 1600px) {
    width: 100%;
  }
  @media (max-width: 850px) {
    width: calc(100svw - 160px);
  }
`;
