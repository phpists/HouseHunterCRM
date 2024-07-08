import styled from "styled-components";
import { Card } from "./Card";
import olxIcon from "../../../../assets/images/olx.png";

const PLATFORMS = [
  { icon: olxIcon, title: "olx" },
  { icon: olxIcon, title: "olx" },
  { icon: olxIcon, title: "olx" },
  { icon: olxIcon, title: "olx" },
];

export const List = () => (
  <StyledList>
    {PLATFORMS?.map(({ title, icon }, i) => (
      <Card key={i} icon={icon} title={title} />
    ))}
  </StyledList>
);

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;
`;
