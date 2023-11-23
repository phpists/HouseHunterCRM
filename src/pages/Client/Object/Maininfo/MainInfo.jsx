import { styled } from "styled-components";
import { Slider } from "./Slider/Slider";
import { Divider } from "../Divider";
import { Field } from "../../../../components/Field";
import { CreatedDate } from "./CreatedDate";
import { Tag } from "./Tag/Tag";
import { ReactComponent as DoorsIcon } from "../../.../../../../assets/images/doors.svg";
import { ReactComponent as ExpandedIcon } from "../../.../../../../assets/images/epanded.svg";
import { ReactComponent as BoxSelectIcon } from "../../.../../../../assets/images/box-select.svg";
import { ReactComponent as StairsIcon } from "../../.../../../../assets/images/stairs.svg";
import noPhoto from "../../.../../../../assets/images/no-photo.svg";
import { TagDivider } from "./Tag/TagDivider";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";
import { useState } from "react";
import { useEffect } from "react";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { fortmatNumber, handleGetLocationAllPath } from "../../../../utilits";

export const Maininfo = ({ data, onChangeField, requestData, isObject }) => {
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

  console.log(data);
  return (
    <StyledMaininfo>
      {isObject && (
        <>
          <Slider photos={data?.img?.length > 0 ? data?.img : [noPhoto]} />
          <Divider />
        </>
      )}
      <SelectTags
        label="Категорія"
        notMultiSelect
        value={data.id_rubric}
        onChange={(val) => onChangeField("id_rubric", val)}
        options={
          rubricsList
            ? rubricsList?.map(({ id, name }) => ({ title: name, value: id }))
            : []
        }
        viewOnly
      />
      <Divider />
      <SelectTags
        label="Локація"
        notMultiSelect
        value={data.id_location}
        onChange={(val) => onChangeField("id_location", val)}
        options={formatedLocations}
        viewOnly
      />
      <Divider />
      <div className="field-group">
        <Field
          value={fortmatNumber(Number(data?.price_min ?? 0))}
          onChange={(val) => onChangeField("price_min", val)}
          label="Вартість"
          className="price-field"
          viewOnly
        />
        <CreatedDate />
      </div>
      <Divider />
      <div className="flex flex-wrap items-center tags">
        <Tag Icon={DoorsIcon} text={`${data?.room_min ?? 0}к`} />
        <TagDivider />
        <Tag
          Icon={ExpandedIcon}
          text={
            <>
              {requestData?.area_total_max ?? 0} м<sup>2</sup>
            </>
          }
        />
        {/* <TagDivider />
        <Tag
          Icon={BoxSelectIcon}
          text={
            <>
              100 м<sup>2</sup>
            </>
          }
        /> */}
        {requestData?.address_storey && (
          <>
            <TagDivider />
            <Tag
              Icon={StairsIcon}
              text={`${requestData?.address_storey} із ${requestData?.storey_count}`}
            />
          </>
        )}
      </div>
      <Divider />

      {data?.comment?.length > 0 ? (
        <>
          <Field
            value={data?.comment}
            onChange={(val) => onChangeField("comment", val)}
            label="Коментар"
            textarea
            className="title-field"
          />
        </>
      ) : null}
    </StyledMaininfo>
  );
};

const StyledMaininfo = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;
  .title-field {
    align-items: start !important;
  }
  .field-group {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    gap: 6px;
  }
  .tags {
    padding: 0 6px;
    gap: 10px 0;
  }
  .price-field {
    .value {
      color: #81fb21;
    }
  }
  .location {
    span {
      width: 130px;
      transition: all 0.3s;
    }
  }
  .area-tag,
  .doors-tag {
    svg {
      transition: all 0.3s;
    }
  }
`;
