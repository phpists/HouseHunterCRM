import styled from "styled-components";
import { Card } from "./Card";
import { Divider } from "../Divider";

export const TemplatesList = () => (
  <StyledTemplatesList className="content-card">
    <Card />
    <Divider />
    <Card />
    <Divider />
    <Card />
  </StyledTemplatesList>
);

const StyledTemplatesList = styled.div`
  padding: 12px 8px 6px;
  background: var(--tag-bg-2);
  border-radius: 14px;
  overflow: hidden;
  @media (max-width: 800px) {
    padding: 8px;
  }
`;
