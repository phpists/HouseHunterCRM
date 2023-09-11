import styled from "styled-components";

export const Text = () => {
  return (
    <StyledText className="hide-scroll clickable">
      <div className="title clickable">
        Оренда 1 кім квартири п. орлика Дрогобич
      </div>
      <div className="descr clickable">
        Оренда 1- кімнатної квартири кухня студія по вул. Шота Руставеллі. В
        квартирі є вся необхідна техніка та меблі, гарна, затишна. Розглядають
        всіх порядних орендарів, без дітей та домашніх улюбленців. Оренда 1-
        кімнатної квартири кухня студія по вул. Шота Руставеллі. В квартирі є
        вся необхідна техніка та меблі, гарна, затишна. Розглядають всіх
        порядних орендарів, без дітей та домашніх улюбленців.
      </div>
    </StyledText>
  );
};

const StyledText = styled.div`
  width: 400px;
  height: 130px;
  overflow: auto;
  margin-bottom: 15px;
  .title {
    color: #fff;
    /* H3 */
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
    margin-bottom: 10px;
  }
  .descr {
    overflow: hidden;
    color: #fff;
    text-overflow: ellipsis;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: 0.4;
  }
`;
