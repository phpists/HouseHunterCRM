import styled from "styled-components";

export const Step = () => (
  <StyledStep className="flex items-center clickable">
    <div className="title clickable">02</div>
    <div className="subtitle clickable">Пiдбiрка автомобілю fdfdfdfd</div>
  </StyledStep>
);

const StyledStep = styled.div`
  padding: 5px 7px 2px;
  border-radius: 5px;
  background: var(--card-bg-2);
  margin-bottom: 8px;
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: 0.4;
    margin-right: 5px;
  }
  .subtitle {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 1.4;
    width: 107px;
  }
  @media (max-width: 1399.9px) {
    height: 47px;
    border-radius: 5px;
    padding: 4px 7px;
    margin: 0;
  }
  @media (max-width: 700px) {
    height: 26px;
    margin-bottom: 15px;
  }
`;
