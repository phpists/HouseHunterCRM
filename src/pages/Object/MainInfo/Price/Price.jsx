import { styled } from "styled-components";
import { Field } from "../../../../components/Field";
import { Divider } from "./Divider";
import { SymbolSelect } from "./SymbolSelect";
import { TypeSelect } from "./TypeSelect";
import { useEffect, useRef } from "react";

export const Price = ({
  className,
  data,
  onChangeField,
  errors,
  mobile,
  options,
}) => {
  const priceRef = useRef(null);

  useEffect(() => {
    if (
      !!errors?.find((e) => e === "updated") &&
      errors.find((e) => e === "price")
    ) {
      const wrapper = document.querySelector(".object-main-wrapper");
      if (wrapper) {
        wrapper.scrollTo({
          top: priceRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [errors]);

  return (
    <StyledPrice className={`flex items-center ${className}`} ref={priceRef}>
      <Field
        value={data?.price}
        onChange={(val) => onChangeField("price", val)}
        label="Ціна"
        className="field"
        placeholder="Введіть ціну"
        full
        error={errors.find((e) => e === "price")}
        mobile={mobile}
        type="number"
      />
      <Divider />
      <SymbolSelect
        value={Number(data?.price_currency)}
        onChange={(val) => onChangeField("price_currency", val)}
      />
      <TypeSelect
        value={data?.price_for}
        onChange={(val) => onChangeField("price_for", val)}
        options={
          data?.id_rubric === "65" || data?.id_rubric === "66"
            ? [
                {
                  title: "Об'єкт",
                  value: "4",
                },
                {
                  title: "Сотка",
                  value: "2",
                },
                // {
                //   title: "Гектар",
                //   value: "3",
                // },
              ]
            : [
                {
                  title: "Обєкт",
                  value: "4",
                },
                {
                  title: "м²",
                  value: "1",
                },
              ]
        }
      />
    </StyledPrice>
  );
};

const StyledPrice = styled.div`
  border-radius: 10px;
  background: #3d3d3d;
  padding: 8px 15px;
  overflow: auto;
  .field {
    flex-shrink: initial;
    width: 150px !important;
    flex-shrink: 0;
    .value {
      color: #50f835;
    }
  }
  @media (max-width: 800px) {
    .field {
      width: 77px !important;
      padding-left: 0;
      padding-right: 0;
      flex-shrink: 0;
      &:hover {
        background: none;
      }
      .edit-btn {
        display: none;
      }
    }
  }
`;
