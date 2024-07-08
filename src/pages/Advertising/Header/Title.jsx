import { styled } from "styled-components";

export const Title = ({ title, isDeleted }) => (
  <StyledTitle isDeleted={isDeleted}>
    <div className="full">
      {isDeleted ? "Автоматичне остаточне видалення протягом місяця" : title}{" "}
    </div>
    <span className="mobile">Обрано 0</span>
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: ${({ isDeleted }) => (isDeleted ? "#f94343" : "var(--dark-90)")};
  font-weight: ${({ isDeleted }) => (isDeleted ? 300 : 200)};
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.36px;
  .mobile {
    display: none;
  }
  @media (max-width: 850px) {
    font-size: 18px;
    .mobile {
      display: block;
    }
    .full {
      display: none;
    }
  }
`;
