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

  const handleChange = (value) => {
    let result = data?.street_base_object?.id_source || [];

    if (
      data?.street_base_object?.id_source?.filter((f) => f === value).length
    ) {
      result = data?.street_base_object?.id_source?.filter((f) => f !== value);
    } else {
      result = [...result, value];
    }

    if (!result.length) {
      result = options.map(({ value }) => value);
    }

    onChange("street_base_object", {
      ...data?.street_base_object,
      id_source: result,
    });
  };

  return (
    <div className="section filterFieldsWrapper">
      {options.map(({ value, title }) => {
        return (
          <CheckOption
            label={title}
            className="check-opt"
            value={data?.street_base_object?.id_source
              ?.filter((f) => f === value)
              .length.toString()}
            onChange={() => handleChange(value)}
          />
        );
      })}
    </div>
  );
};

export default Placement;
