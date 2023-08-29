import { styled } from "styled-components";

export const Value = ({ from, to, type }) => (
  <StyledValue className="flex items-center">
    {from}
    {type ? <span className="first-type">{type}</span> : null} - {to}
    {type ? <span>{type}</span> : null}
  </StyledValue>
);

const StyledValue = styled.div`
  border-radius: 4px;
  background: #3d3d3d;
  padding: 3px 9px 4px 10px;
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  .first-type {
    margin-right: 3px;
  }
  span {
    margin-left: 2px;
  }
`;
