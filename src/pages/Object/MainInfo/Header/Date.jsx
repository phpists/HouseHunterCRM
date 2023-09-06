import { styled } from "styled-components";
import { Field } from "../../../../components/Field";

export const Date = () => {
  return (
    <StyledDate className="flex items-center justify-center">
      <div className="text-data">
        <div className="title">23.07.2023</div>
        <div className="subtitle">звільняється з </div>
      </div>
      <Field
        value="23.07.2023"
        label="звільняється з "
        className="header-field"
      />
    </StyledDate>
  );
};

const StyledDate = styled.div`
  width: 100%;
  margin: 0 3px;
  cursor: pointer;
  position: relative;
  .text-data {
    width: 100%;
    transition: all 0.3s;
  }
  .title {
    color: #fff;
    text-align: center;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .subtitle {
    color: #fff;
    text-align: center;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .header-field {
    flex-shrink: inherit;
    position: absolute;
    width: 100%;
    opacity: 0;
    transition: all 0.3s;
    z-index: 1;
    background: #3c3c3c;
    &.edit {
      opacity: 1;
    }
  }
  &:hover {
    .text-data {
      opacity: 0;
    }
    .header-field {
      opacity: 1;
    }
  }
`;
