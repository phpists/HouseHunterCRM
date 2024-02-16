import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Characteristic } from "./Characteristic/Characteristic";
import { Price } from "./Price/Price";
import { handleCheckIsField } from "../../../utilits";

export const MainInfo = ({ data, onChangeField, fields, errors }) => {
  return (
    <StyledMainInfo className="object-maininfo-wrapper">
      <Header
        className="desktop-maininfo-header"
        data={data}
        onChangeField={onChangeField}
      />

      <Characteristic
        data={data}
        onChangeField={onChangeField}
        fields={fields}
        errors={errors}
      />
      <Price
        className="desktop-price-wrapper"
        data={data}
        onChangeField={onChangeField}
        errors={errors}
        options={
          fields?.main_field?.price_for?.field_option
            ? Object.entries(fields?.main_field?.price_for?.field_option)?.map(
                (f) => ({ title: f[1], value: f[0] })
              )
            : []
        }
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
