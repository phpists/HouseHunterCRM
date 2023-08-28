import { styled } from "styled-components";
import { Avatar } from "./Avatar";
import team1 from "../../../../../assets/images/team-1.png";
import team2 from "../../../../../assets/images/team-2.png";
import team3 from "../../../../../assets/images/team-3.png";
import team4 from "../../../../../assets/images/team-4.png";

const data = [team1, team2, team3, team4, team1, team2];

export const List = () => (
  <StyledList className="flex items-center">
    {data.map((photo, i) => (
      <Avatar key={i} photo={photo} zIndex={data.length - i} />
    ))}
  </StyledList>
);

const StyledList = styled.div`
  div:not(:first-child) {
    margin-left: -10px;
  }
`;
