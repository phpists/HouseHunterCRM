import { ToggleOption } from "../ToggleOption";
import { CheckOption } from "../CheckOption";
import { notifications } from "../../constants";

const Notifications = ({ data, onChange }) => {
  const toggle = (index) => {
    let filer = data?.street_base_object.showFilterObject || [];
    if (filer.includes(index)) {
      filer = filer.filter((i) => i !== index);
    } else {
      filer = [...filer, index];
    }
    onChange("street_base_object", {
      ...data?.street_base_object,
      showFilterObject: filer,
    });
  };
  const isToggle = (index) =>
    data?.street_base_object?.showFilterObject.includes(index) ? "1" : "0";

  return (
    <div className="section filterFieldsWrapper">
      <ToggleOption
        label="Сповіщення"
        value={data.street_base_object.showFilterObject}
        onChange={() => {
          if (data.street_base_object.showFilterObject) {
            const { showFilterObject, ...rest } = data.street_base_object;
            onChange("street_base_object", {
              ...rest,
            });
          } else {
            onChange("street_base_object", {
              ...data.street_base_object,
              showFilterObject: [],
            });
          }
        }}
      />

      {data.street_base_object.showFilterObject && (
        <>
          {notifications.map(({ id, title }) => (
            <CheckOption
              label={title}
              className="check-opt"
              value={isToggle(id)}
              onChange={() => {
                toggle(id);
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Notifications;
