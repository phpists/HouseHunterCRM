import styled from "styled-components";

export const Title = ({ selectedCount, isdDeleted }) => (
  <StyledTitle isDeleted={isdDeleted}>
    {isdDeleted
      ? "Автоматичне остаточне видалення протягом місяця"
      : `Обрано ${selectedCount}`}
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: ${({ isDeleted }) =>
    isDeleted ? "#f94343" : "rgba(255, 255, 255, 0.9)"};
  font-weight: ${({ isDeleted }) => (isDeleted ? 300 : 200)};
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.36px;
`;
