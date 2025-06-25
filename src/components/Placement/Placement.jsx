import { useGetSourcesQuery } from "../../store/objects/objects.api";
import { CheckOption } from "../CheckOption";

const Placement = ({ data, onChange }) => {
  const { data: sources } = useGetSourcesQuery();
  const options =
    typeof sources === "object"
      ? Object?.entries(sources)?.map((e) => ({
          value: e[0],
          title: e[1],
        }))
      : [];

  return (
    <>
      {options.map(({ value, title }) => {
        return (
          <CheckOption
            label={title}
            className="check-opt"
            value={
              data?.street_base_object?.id_source === undefined
                ? "1"
                : data?.street_base_object?.id_source === value
                ? "1"
                : "0"
            }
            onChange={(val) => {
              console.log(value);
              onChange("street_base_object", {
                ...data?.street_base_object,
                id_source:
                  value === data?.street_base_object?.id_source
                    ? undefined
                    : value,
              });
            }}
          />
        );
      })}
    </>
  );
};

export default Placement;
