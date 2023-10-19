import { styled } from "styled-components";

export const Email = ({ email }) => <StyledEmail>{email}</StyledEmail>;

const StyledEmail = styled.div`
  color: #fff;
  text-align: right;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
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
