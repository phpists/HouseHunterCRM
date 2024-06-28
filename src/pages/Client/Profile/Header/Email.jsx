import { styled } from "styled-components";

export const Email = ({ email }) => <StyledEmail>{email}</StyledEmail>;

const StyledEmail = styled.div`
  color: var(--main-color);
  text-align: right;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
  margin-top: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 80%;
  white-space: nowrap;
  text-align: left;
`;
