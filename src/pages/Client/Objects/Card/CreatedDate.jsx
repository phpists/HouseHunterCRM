import { styled } from "styled-components";

export const CreatedDate = ({ date }) => (
  <StyledCreatedDate>
    Створений {date}
    {/* <span>•</span> ID:1254 */}
  </StyledCreatedDate>
);

const StyledCreatedDate = styled.div`
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
  margin-top: 2px;
  span {
    color: rgba(255, 255, 255, 0.4);
    margin: 0 1px;
  }
`;
