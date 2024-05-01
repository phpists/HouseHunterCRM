import { styled } from "styled-components";

export const CreatedDate = ({ date, dateTo, isDeleted }) => (
  <StyledCreatedDate isDeleted={isDeleted}>
    {isDeleted ? (
      "Видалений"
    ) : dateTo ? (
      <>До {dateTo}</>
    ) : (
      <> Створений {date}</>
    )}
  </StyledCreatedDate>
);

const StyledCreatedDate = styled.div`
  color: ${({ isDeleted }) => (isDeleted ? "#f94343" : "var(--main-color)")};
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: ${({ isDeleted }) => (isDeleted ? 600 : 300)};
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: ${({ isDeleted }) => (isDeleted ? 1 : 0.4)};
  margin-top: 2px;
  span {
    color: var(--second-color);
    margin: 0 1px;
  }
`;
