import { CheckOption } from "../../../../components/CheckOption";
import { ProfileField } from "../../../../components/ProfileField";
import { Select } from "../../../../components/Select/Select";

export const Fields = ({
  fields,
  data,
  notAllowedFields,
  commentsToFields,
  onChangeField,
  errors,
  collapsed,
}) => {
  return (
    <div className="fields">
      {fields
        ? Object.entries(fields)
            .filter((field) => !notAllowedFields?.find((f) => f === field[0]))
            ?.sort((a, b) => a[1]?.sort - b[1]?.sort)
            ?.filter((field) =>
              collapsed
                ? field?.[1]?.collapsed === 1
                : field?.[1]?.collapsed === 0
            )
            .map((field) => {
              if (typeof field[1]?.field_option === "object") {
                return (
                  <Select
                    value={data[field[0]]}
                    options={Object.entries(field[1]?.field_option)?.map(
                      (opt) => ({ value: opt[0], title: opt[1] })
                    )}
                    onChange={(val) => onChangeField(field[0], val)}
                    label={commentsToFields?.object[field[0]] ?? "-"}
                    labelActive={commentsToFields?.object[field[0]] ?? "-"}
                    hideArrowDefault
                    error={!!errors.find((e) => e === field[0])}
                  />
                );
              } else if (field[1]?.type === "checkbox") {
                return (
                  <CheckOption
                    label={commentsToFields?.object[field[0]]}
                    value={data[field[0]]}
                    onChange={(val) => onChangeField(field[0], val)}
                  />
                );
              } else {
                return (
                  <ProfileField
                    placeholder="Введіть значення"
                    value={data[field[0]]}
                    onChange={(val) => onChangeField(field[0], val)}
                    label={commentsToFields?.object[field[0]] ?? field[0]}
                    className="field"
                    grey
                    type={field[1]?.type === "int" ? "number" : field[1]?.type}
                    error={!!errors.find((e) => e === field[0])}
                  />
                );
              }
            })
        : null}
    </div>
  );
};
