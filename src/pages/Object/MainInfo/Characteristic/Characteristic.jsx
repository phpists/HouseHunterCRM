import { styled } from "styled-components";
import { Header } from "./Header";
import { Select } from "../../../../components/Select/Select";
import { DetailPosition } from "./DetailPosition";
import { Categories } from "./Categories";
import { Info } from "./Info";
import { useState } from "react";
import { useEffect } from "react";
import {
  handleCheckIsField,
  handleGetLocationAllPath,
} from "../../../../utilits";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";

export const Characteristic = ({ data, onChangeField, fields }) => {
  const [open, setOpen] = useState(false);
  const { data: rubricsList } = useGetRubricsQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);

  const handleFormatLocations = () => {
    const locList = Object.entries(locationsList)?.map((loc) => loc[1]);
    const locations = Object.entries(locationsList)
      .sort((a, b) => Number(b[1].id_parent) - Number(a[1].id_parent))
      ?.map((loc) => loc[1])
      .filter((loc) => Number(loc?.id_parent) !== 0)
      .map(({ id, id_parent, name }) => {
        return handleGetLocationAllPath(locList, id, id_parent, name);
      });

    setFormatedLocations(locations);
  };

  useEffect(() => {
    if (locationsList) {
      handleFormatLocations();
    }
  }, [locationsList]);

  return (
    <StyledCharacteristic open={open}>
      <Header open={open} onToggleOpen={() => setOpen(!open)} />
      <div className="content-wrapper hide-scroll">
        <div className="characteristic-content">
          <Select
            value={data?.id_rubric}
            onChange={(val) => onChangeField("id_rubric", val)}
            options={
              rubricsList
                ? rubricsList?.map(({ id, name }) => ({
                    title: name,
                    value: id,
                  }))
                : []
            }
            label="Категорія"
            labelActive="Оберіть категорію"
            className="mb-2"
            hideArrowDefault
          />
          <Select
            value={data?.id_location}
            onChange={(val) => onChangeField("id_location", val)}
            options={formatedLocations}
            label="Розташування"
            labelActive="Оберіть розташування"
            className="mb-2"
            hideArrowDefault
          />
          {handleCheckIsField(fields, "address_house_number") ? (
            <DetailPosition data={data} onChangeField={onChangeField} />
          ) : null}
        </div>
        {fields?.main_field && (
          <Info fields={fields} data={data} onChangeField={onChangeField} />
        )}
        {fields?.other_field && (
          <Categories
            data={data}
            onChangeField={onChangeField}
            fields={fields}
          />
        )}
      </div>
    </StyledCharacteristic>
  );
};

const StyledCharacteristic = styled.div`
  border-radius: 10px;
  background: #3d3d3d;
  padding: 14px 14px 12px 15px;
  margin-bottom: 11px;
  .content-wrapper {
    height: calc(100svh - 420px);
    overflow: auto;
  }
  .characteristic-content {
    border-radius: 10px;
    background: #323232;
    padding: 8px;
  }
  @media (max-width: 1300px) {
    .content-wrapper {
      height: 411px;
    }
  }

  @media (max-width: 800px) {
    margin-bottom: 0px;
    padding: 10px;
    .content-wrapper {
      transition: all 0.3s;
      height: ${({ open }) => (open ? "calc(100svh - 420px)" : "0px")};
    }
  }
`;
