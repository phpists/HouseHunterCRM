import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Characteristic } from "./Characteristic/Characteristic";
import { Price } from "./Price/Price";
import { handleCheckIsField } from "../../../utilits";

export const MainInfo = ({ data, onChangeField, fields }) => {
  return (
    <StyledMainInfo>
      {handleCheckIsField(fields, "obj_is_actual_dt") && (
        <Header
          className="desktop-maininfo-header"
          data={data}
          onChangeField={onChangeField}
        />
      )}

      <Characteristic
        data={data}
        onChangeField={onChangeField}
        fields={fields}
      />
      <Price
        className="desktop-price-wrapper"
        data={data}
        onChangeField={onChangeField}
      />
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  @media (max-width: 1300px) {
    .desktop-maininfo-header {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .desktop-price-wrapper {
      display: none;
    }
  }
`;
