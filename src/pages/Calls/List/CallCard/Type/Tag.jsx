import styled from "styled-components";

export const Tag = ({ callType = "-" }) => (
  <StyledTag className="clickable">{callType}</StyledTag>
);

const StyledTag = styled.div`
  border-radius: 5px;
  background: rgba(88, 175, 255, 0.3);
  height: 20px;
  color: #58afff;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 1;
  letter-spacing: 0.22px;
  text-transform: capitalize;
  margin-bottom: 8px;
  padding: 5.5px 8px 6.5px;
  width: max-content;
  @media (max-width: 1399.9px) {
    margin: 0 0 0 4px;
  }
`;
