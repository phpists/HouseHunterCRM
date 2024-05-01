import { styled } from "styled-components";

export const SymbolSelect = ({ onChangeCurrency, activeCurrency }) => {
  const options = ["₴", "$", "€"];

  return (
    <StyledSymbolSelect>
      {options.map((opt, i) => (
        <div
          key={i}
          className={`flex items-end justify-center ${
            i === activeCurrency && "active"
          }`}
          onClick={() => onChangeCurrency(i)}
        >
          {opt}
        </div>
      ))}
    </StyledSymbolSelect>
  );
};

const StyledSymbolSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 3px;
  div {
    border-radius: 5px;
    height: 20px;
    width: 20px;
    padding: 1px 4px;
    background: var(--card-bg-2);
    color: var(--second-color);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 0.9;
    letter-spacing: 0.28px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    &.active {
      color: var(--main-color);
      border: 1px solid var(--bg-20);
    }
  }
`;
