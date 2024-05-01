import { styled } from "styled-components";
import { fortmatNumber } from "../../../../../../utilits";

export const Value = ({ from, to, type }) => (
  <StyledValue className="flex items-center">
    {fortmatNumber(from)}
    {type ? <span className="first-type">{type}</span> : null} -
    {fortmatNumber(to)}
    {type ? <span>{type}</span> : null}
  </StyledValue>
);

const StyledValue = styled.div`
  border-radius: 4px;
  background: var(--card-bg);
  padding: 3px 9px 4px 10px;
  color: var(--main-color);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  .first-type {
    margin-right: 3px;
  }
  span {
    margin-left: 2px;
  }
`;
