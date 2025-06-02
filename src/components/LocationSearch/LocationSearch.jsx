import { useEffect, useState } from "react";
import { SelectTags } from "../SelectTags/SelectTags";
import { useGetLocationsQuery } from "../../store/requests/requests.api";
import {
  checkIsArray,
  handleGetLocationAllPath,
  showAlert,
} from "../../utilits";
import styled from "styled-components";
import { Modal } from "./Modal";
import { ProfileField } from "../ProfileField";

export const LocationSearch = ({
  label,
  value,
  onChange,
  error,
  placeholder = "Будь яка",
}) => {
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleFormatLocations = () => {
    const locList = Object.entries(locationsList)?.map((loc) => loc[1]);
    const locations = Object.entries(locationsList)
      .sort((a, b) => Number(b[1].id_parent) - Number(a[1].id_parent))
      ?.map((loc) => loc[1])
      //   .filter((loc) => Number(loc?.id_parent) !== 0)
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
    <StyledLocationSearch>
      {" "}
      <div onClick={() => setShowModal(true)}>
        <ProfileField
          label={label}
          error={error}
          value={
            value?.length > 0
              ? value
                  ?.map(
                    (l) =>
                      formatedLocations.find((loc) => loc.value === l)?.title
                  )
                  ?.join(", ")
              : placeholder
          }
          readOnly
        />
      </div>
      {showModal ? (
        <Modal
          value={checkIsArray(value) ? value : []}
          onClose={() => setShowModal(false)}
          onChange={onChange}
          locations={formatedLocations}
        />
      ) : null}
    </StyledLocationSearch>
  );
};

const StyledLocationSearch = styled.div`
  position: relative;
`;
