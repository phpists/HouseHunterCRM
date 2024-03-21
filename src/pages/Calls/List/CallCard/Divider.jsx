import styled from "styled-components";

export const Divider = () => <StyledDivider className="clickable" />;

const StyledDivider = styled.div`
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  margin: 12px 20px 0;
  @media (min-width: 1400px) {
    margin: 12px 10px 0;
  }
  @media (min-width: 1600px) {
    margin: 12px 10px 0;
  }
`;
