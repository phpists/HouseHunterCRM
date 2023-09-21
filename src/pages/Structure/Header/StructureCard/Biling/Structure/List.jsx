import { styled } from "styled-components";
import { Avatar } from "./Avatar";
import team1 from "../../../../../../assets/images/team-1.png";
import team2 from "../../../../../../assets/images/team-2.png";
import team3 from "../../../../../../assets/images/team-3.png";
import team4 from "../../../../../../assets/images/team-4.png";

const data = [team1, team2];

export const List = () => (
  <StyledList className="flex items-center">
    {data.map((photo, i) => (
      <Avatar key={i} photo={photo} zIndex={data.length - i} />
    ))}
  </StyledList>
);

const StyledList = styled.div`
  border-radius: 20px;
  background: #333;
  padding: 4px;
  width: 98px;
  div:not(:first-child) {
    margin-left: -10px;
  }
`;
