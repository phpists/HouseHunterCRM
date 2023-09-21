import React from "react";
import styled from "styled-components";

export const Breadcrumbs = ({ level }) => {
  const LEVELS = ["Структура", "Структурні керівники", "Агенти"];
  const LEVELS2 = ["Структура", "Структурний керівник Юрій Мицавка", "Агенти"];

  console.log(level);
  return (
    <StyledBreadcrumbs className="flex items-center" isSmall={level >= 3}>
      {level < 3
        ? LEVELS.slice(0, level).map((title, i) => (
            <React.Fragment>
              <div
                className={`title ${
                  i === LEVELS.slice(0, level).length - 1 && "active"
                }`}
              >
                {title}
              </div>
              {i < LEVELS.slice(0, level).length - 1 && (
                <div className="divider">/</div>
              )}
            </React.Fragment>
          ))
        : LEVELS2.map((title, i) => (
            <React.Fragment>
              <div
                className={`title ${
                  i === LEVELS.slice(0, level).length - 1 && "active"
                }`}
              >
                {title}
              </div>
              {i < LEVELS.slice(0, level).length - 1 && (
                <div className="divider">/</div>
              )}
            </React.Fragment>
          ))}
    </StyledBreadcrumbs>
  );
};

const StyledBreadcrumbs = styled.div`
  font-size: ${({ isSmall }) => (isSmall ? 14 : 18)}px;
  .title {
    color: rgba(255, 255, 255, 0.4);
    font-family: Overpass;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    letter-spacing: 0.36px;
    &.active {
      color: rgba(255, 255, 255, 0.9);
      font-family: Overpass;
      font-style: normal;
      font-weight: 100;
      line-height: normal;
      letter-spacing: 0.36px;
    }
  }
  .divider {
    color: rgba(255, 255, 255, 0.4);
    font-family: Overpass;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    letter-spacing: 0.36px;
    margin: 0 4px;
  }
`;
