import Accordion from "../Accordions/Accordion";
import { Divider } from "../Base/Divider";
import { CheckOption } from "../CheckOption";
import Price from "./Price";

const PriceChange = ({
  data,
  onChangeFilter,
  onChangeInputFocus,
  isInputFocused,
}) => {
  const changeFilter = (option) => {
    const defaults = {
      price_change: 50,
      price_change_period: "4",
      price_change_up: "2",
      price_change_up_procent: 2,
    };

    const updatedValues = {
      price_change:
        option?.price_change ??
        data?.street_base_object?.price_change ??
        defaults.price_change,
      price_change_period:
        option?.price_change_period ??
        data?.street_base_object?.price_change_period ??
        defaults.price_change_period,
      price_change_up:
        option?.price_change_up ??
        data?.street_base_object?.price_change_up ??
        defaults.price_change_up,
      price_change_up_procent:
        option?.price_change_up_procent ??
        data?.street_base_object?.price_change_up_procent ??
        defaults.price_change_up_procent,
    };

    onChangeFilter("street_base_object", {
      ...data?.street_base_object,
      ...updatedValues,
    });
  };

  return (
    <div className="section filterFieldsWrapper">
      <Price
        onFocus={() => !isInputFocused && onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
        onChangeFilter={(option) => changeFilter(option)}
        data={data}
      />
      <Divider />

      <Accordion
        hideSearch
        active={data?.street_base_object?.price_change_up}
        label={"Ціна пішла"}
        options={[
          { title: "Вгору", value: "1" },
          { title: "Вниз", value: "2" },
        ]}
        onChange={(val) => changeFilter({ price_change_up: val })}
      />
      <Divider />

      <Accordion
        hideSearch
        active={data?.street_base_object?.price_change_period}
        label={"Ціна змінилась за період"}
        options={[
          { title: "Годину", value: "1" },
          { title: "Добу", value: "2" },
          { title: "Дві доби", value: "3" },
          { title: "За тиждень", value: "4" },
        ]}
        onChange={(val) => changeFilter({ price_change_period: val })}
      />
      <Divider />

      <CheckOption
        label="Ціна часто змінюється"
        className="check-opt"
        value={data?.street_base_object?.show_tag_price_dump}
        onChange={(val) =>
          onChangeFilter("street_base_object", {
            ...data?.street_base_object,
            show_tag_price_dump:
              data?.street_base_object?.show_tag_price_dump === "1"
                ? undefined
                : "1",
          })
        }
      />
    </div>
  );
};

export default PriceChange;
