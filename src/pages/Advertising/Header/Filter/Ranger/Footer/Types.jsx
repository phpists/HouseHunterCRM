import { styled } from "styled-components";

export const Types = ({ types, activeType, onChangeType }) => (
  <StyledTypes className="select-none">
    {types.map((type, i) => (
      <div
        key={i}
        className={`${activeType === i && "active"}`}
        onClick={() => onChangeType(i)}
      >
        {type}
      </div>
    ))}
  </StyledTypes>
);

const StyledTypes = styled.div`
  padding: 2px;
  border-radius: 4px;
  background: var(--card-bg);
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 2px;
  margin-left: 5px;
  cursor: pointer;
  div {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border-radius: 2px;
    transition: all 0.3s;
    color: var(--second-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    transition: all 0.3s;
    padding: 1px 5px 2px 6px;
    &:hover {
      background: var(--bg-20);
    }
    &.active {
      background: #fff !important;
      color: #2c2c2c;
    }
  }
`;
