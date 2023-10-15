import { styled } from "styled-components";
import { Photo } from "./Photo";
import teamPhoto from "../../../../assets/images/team-1.png";
import teamPhoto2 from "../../../../assets/images/team-2.png";
import teamPhoto3 from "../../../../assets/images/team-3.png";
import { AddButton } from "./AddButton";

export const OtherInfo = () => {
  return (
    <StyledOtherInfo className="flex items-center hide-scroll">
      <Photo photo={teamPhoto} />
      <Photo photo={teamPhoto2} />
      <Photo photo={teamPhoto3} />
      <AddButton />
    </StyledOtherInfo>
  );
};

const StyledOtherInfo = styled.div`
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.2);
  padding: 3px;
  overflow: auto;
`;
