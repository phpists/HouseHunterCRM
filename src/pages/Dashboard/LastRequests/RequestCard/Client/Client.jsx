import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Subtitle } from "./Subtitle";
import { Rent } from "./Rent";

export const Client = () => (
  <StyledClient className="flex items-center justify-between">
    <div className="flex items-center">
      <Avatar />
      <div>
        <Name />
        <Subtitle subtitle="ID клієнта: 1246" />
      </div>
    </div>
    <div>
      <Rent />
      <Subtitle subtitle="ID: 332" />
    </div>
  </StyledClient>
);

const StyledClient = styled.div`
  height: 40px;
  margin-bottom: 10px;
`;
