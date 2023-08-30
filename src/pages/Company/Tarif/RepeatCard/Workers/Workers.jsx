import { styled } from "styled-components";
import { List } from "./List";

export const Workers = () => (
  <StyledWorkers className="flex items-center">
    <span>6 Працівників</span>
    <List />
  </StyledWorkers>
);

const StyledWorkers = styled.div`
  border-radius: 24px;
  background: #323232;
  padding: 2px 2px 2px 10px;
  color: #58afff;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
  text-transform: uppercase;
  margin-right: 10px;
  span {
    margin-right: 6px;
  }
`;
