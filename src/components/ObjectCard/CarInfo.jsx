import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Tag } from "./MainInfo/Tags/Tag";
import { useGetSourcesQuery } from "../../store/objects/objects.api";
import { AdTags } from "./Tags/AdTags/AdTags";
import { Tags } from "./Tags/Tags";

export const CarInfo = ({
  data,
  onOpenInfo,
  onUpdateField,
  noEdit,
  onChangeTags,
}) => {
  const textRef = useRef();
  const tagsRef = useRef();
  const { data: sources } = useGetSourcesQuery();

  useEffect(() => {
    const textDividedByBr =
      data?.description?.length > 0
        ? data?.description
            ?.replaceAll("<br />", "<DIVIDER/>")
            ?.replaceAll("&amp;#039;", "'")
            ?.replaceAll(/\s\s/g, "")
            ?.split("<DIVIDER/>")
            ?.filter((str) => str?.length > 0)
            ?.filter((str) => str !== "\t")
            ?.join("<br />")
        : "-";
    textRef.current.innerHTML = textDividedByBr;
  }, [data]);

  return (
    <StyledCarInfo>
      {" "}
      <div
        className="descr clickable"
        ref={textRef}
        onClick={(e) => {
          if (onOpenInfo) {
            e.stopPropagation();
            onOpenInfo();
          }
        }}
        style={{ maxHeight: 150 - (tagsRef?.current?.offsetHeight ?? 0) }}
      ></div>
      <div className="tags" ref={tagsRef}>
        {data.VIN && <Tag title={`VIN ${data.VIN}`} />}
        {data?.state_number && <Tag title={data?.state_number} />}
        {data.id_source && <Tag title={sources[data.id_source]} />}
        {data?.id_ad_in_source && <Tag title={`ID ${data?.id_ad_in_source}`} />}
        <Tag title={data?.count_views} iIcom="bi bi-eye" />
        <Tag title={data?.count_likes} iIcom="bi bi-heart" />
        <Tags
          data={data}
          onUpdateField={onUpdateField}
          noEdit={noEdit}
          onChangeTags={onChangeTags}
        />
      </div>
    </StyledCarInfo>
  );
};

const StyledCarInfo = styled.div`
  display: grid;
  grid-template-rows: 1fr max-content;
  .descr {
    margin: 0px 0 10px;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: var(--opacity-ligh);
    width: 100%;
    max-height: 90px;
    overflow: auto;
  }
  .tags {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
  }
  @media (max-width: 1110px) {
    grid-column: 1/3;
  }
`;
