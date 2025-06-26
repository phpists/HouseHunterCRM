import { useEffect } from "react";
import { useGetSortingObjectQuery } from "../../store/requests/requests.api";
import { CARS_STATUSES } from "../Base/Base";
import { Divider } from "../Base/Divider";
import { Period } from "../Base/Period/Period";
import { SelectTags } from "../SelectTags/SelectTags";
import Accordion from "../Accordions/Accordion";
import { useGetSortObjectViewQuery } from "../../store/objects/objects.api";

const SearchResults = ({ data, onChangeFilter, filtersFields }) => {
  const { data: sortingPeriods } = useGetSortingObjectQuery();
  const { data: sortData } = useGetSortObjectViewQuery();

  const handleChangeStatusesTagsObjarray = (val) => {
    const prevValue = Array.isArray(data?.street_base_object?.id_status_add)
      ? data?.street_base_object?.id_status_add
      : [];

    onChangeFilter("street_base_object", {
      ...data?.street_base_object,
      id_status_add: prevValue?.find((t) => t === val?.toString())
        ? prevValue?.filter((t) => t?.toString() !== val?.toString())
        : [...prevValue, val?.toString()],
    });
  };

  return (
    <div className="section filterFieldsWrapper">
      <SelectTags
        label="статус оголошення"
        className="mb-2"
        placeholder="Оберіть"
        options={CARS_STATUSES}
        tags={
          Array.isArray(data?.street_base_object?.id_status_add)
            ? data?.street_base_object?.id_status_add?.map((t) => ({
                title: CARS_STATUSES?.find((v) => v.value === t)?.title ?? "-",
                value: t?.toString(),
              }))
            : []
        }
        onChange={handleChangeStatusesTagsObjarray}
        showTags
      />
      <Divider />

      <Period
        value={data?.street_base_object?.sorting_id}
        onChange={(val) =>
          onChangeFilter("street_base_object", {
            ...data?.street_base_object,
            sorting_id: val,
          })
        }
        options={
          sortingPeriods?.objects
            ? Object.entries(sortingPeriods?.objects)?.map((c) => ({
                title: c[1],
                value: c[0],
              }))
            : []
        }
      />
      <Divider />

      <Accordion
        active={+data?.sorting}
        label={"Cортування"}
        options={sortData?.map(({ id, name }) => ({ value: id, title: name }))}
        onChange={(val) => onChangeFilter("sorting", val)}
      />
    </div>
  );
};

export default SearchResults;
