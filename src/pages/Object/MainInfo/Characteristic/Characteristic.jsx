import { styled } from "styled-components";
import { Header } from "./Header";
import { Select } from "../../../../components/Select/Select";
import { DetailPosition } from "./DetailPosition";
import { Info } from "./Info";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { handleGetLocationAllPath } from "../../../../utilits";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";
import { CheckOption } from "../../../../components/CheckOption";

export const Characteristic = ({ data, onChangeField, fields, errors }) => {
  const [open, setOpen] = useState(false);
  const { data: rubricsList } = useGetRubricsQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);
  const contentRef = useRef(null);
  const [selectOpened, setSelectOpend] = useState(false);

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

  const handleScrollToErrorFields = () => {
    const firstErrorField = document.querySelectorAll(
      ".object-characteristic-wrapper .error-field"
    );
    if (firstErrorField[0]) {
      contentRef.current.scrollTo({
        top: firstErrorField[0].offsetTop - contentRef.current.offsetTop - 10,
      });
    }
  };

  useEffect(() => {
    if (!!errors?.find((e) => e === "updated")) {
      handleScrollToErrorFields();
    }
  }, [errors]);

  useEffect(() => {
    if (selectOpened) {
      setSelectOpend(false);
      const firstErrorField = document.querySelectorAll(
        ".object-characteristic-wrapper .selectOpened"
      );
      if (firstErrorField[0]) {
        contentRef.current.scrollTo({
          top: firstErrorField[0].offsetTop - contentRef.current.offsetTop - 10,
        });
      }
    }
  }, [selectOpened]);

  return (
    <StyledCharacteristic open={open} className="object-characteristic-wrapper">
      <Header open={open} onToggleOpen={() => setOpen(!open)} />
      <div className="content-wrapper hide-scroll" ref={contentRef}>
        <div className="characteristic-content">
          {/* <CheckOption
            label="Ліквідність"
            value={data?.liquidity}
            onChange={() =>
              onChangeField("liquidity", data?.liquidity ? undefined : "1")
            }
            className="mb-2"
          /> */}
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
            error={!!errors.find((e) => e === "id_rubric")}
            isSearch
            onOpen={() => setSelectOpend(true)}
          />
          <Select
            value={data?.id_location}
            onChange={(val) => onChangeField("id_location", val)}
            options={formatedLocations}
            label="Розташування"
            labelActive="Оберіть розташування"
            className="mb-2"
            hideArrowDefault
            isSearch
            error={!!errors.find((e) => e === "id_location")}
            onOpen={() => setSelectOpend(true)}
          />
          <DetailPosition
            data={data}
            onChangeField={onChangeField}
            fields={fields}
          />
        </div>
        {fields?.main_field && (
          <Info
            fields={fields}
            data={data}
            onChangeField={onChangeField}
            errors={errors}
            onOpenSelect={() => setSelectOpend(true)}
            onScrollToErrorFields={handleScrollToErrorFields}
          />
        )}
      </div>
    </StyledCharacteristic>
  );
};

const StyledCharacteristic = styled.div`
  border-radius: 10px;
  background: var(--card-bg);
  padding: 14px 14px 12px 15px;
  margin-bottom: 11px;
  .field {
    .value {
      max-width: 350px;
      text-overflow: ellipsis;
    }
  }
  .content-wrapper {
    height: calc(100svh - 365px);
    overflow: auto;
  }
  .characteristic-content {
    border-radius: 10px;
    background: var(--dark-card-bg);
    padding: 8px;
  }
  @media (max-width: 1300px) {
    .content-wrapper {
      max-height: 411px;
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
