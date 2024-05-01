import { styled } from "styled-components";

export const SymbolSelect = ({ active, onChange }) => {
  const options = ["₴", "$", "€"];
  return (
    <StyledSymbolSelect className="ml-2.5">
      {options.map((opt, i) => (
        <div
          key={i}
          className={`flex items-baseline justify-center ${
            active === 1 + i && "active"
          }`}
          onClick={() => onChange(1 + i)}
        >
          {opt}
        </div>
      ))}
    </StyledSymbolSelect>
  );
};

const StyledSymbolSelect = styled.div`
  border-radius: 7px;
  background: var(--bg-5);
  padding: 2px;
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 3px;
  div {
    border-radius: 5px;
    height: 18px;
    width: 18px;
    color: var(--second-color);
    text-align: center;
    color: var(--main-color);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 1.4; /* 16.52px */
    letter-spacing: 0.28px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    &.active {
      background: var(--card-bg-2);
      color: var(--main-color);
      border: 1px solid var(--bg-20);
    }
  }
  @media (max-width: 800px) {
    margin-left: 4px !important;
  }
`;
