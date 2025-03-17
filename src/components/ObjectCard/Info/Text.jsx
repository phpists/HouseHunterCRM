import styled from "styled-components";
import { ReactComponent as EditIcon } from "../../../assets/images/edit.svg";
import { useEffect, useRef } from "react";
import { Price } from "./Price";
import { Tags } from "../MainInfo/Tags/Tags";
import { useNavigate } from "react-router-dom";

export const Text = ({ data, editable, onEdit, ad, onOpenInfo }) => {
  const textRef = useRef();
  const navigate = useNavigate();

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

  const handleGetTags = () => {
    let tags = [];

    if (data?.tag_faster && data?.tag_faster === "1") {
      tags.push("Терміново");
    }
    if (data?.tag_nativePaint && data?.tag_nativePaint === "1") {
      tags.push("Рідна фарба");
    }
    if (data?.tag_exchangePossible && data?.tag_exchangePossible === "1") {
      tags.push("Можливий обмін");
    }
    if (data?.tag_freshlyDriven && data?.tag_freshlyDriven === "1") {
      tags.push("Свіжопригнана");
    }
    if (data?.tag_afterDTP && data?.tag_afterDTP === "1") {
      tags.push("Після дтп");
    }

    return tags;
  };

  return (
    <StyledText className={`hide-scroll clickable ${ad && "only-text"}`}>
      <div className="text-header">
        <div>
          <div>
            <div className="index-overbuy">{data?.index_overbuying}/10</div>
            <div
              className="main-title clickable mb-2"
              onClick={(e) => {
                if (onOpenInfo) {
                  e.stopPropagation();
                  if (data?.link) {
                    window.open(data?.link, "_blank");
                  }
                }
              }}
            >
              {`${data?.brand_name} ${data?.model_name} ${data?.year}`}
              {editable ? (
                <div
                  className="edit-icon flex items-center justify-center"
                  onClick={onEdit}
                >
                  <EditIcon />
                </div>
              ) : null}
            </div>
          </div>
          <div className="text-content">
            <Tags data={data} />
            <Price data={data} />
          </div>
        </div>
        <div>
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
          ></div>
          {handleGetTags()?.length > 0 ? (
            <div className="tags-text">
              Теги: {handleGetTags()?.slice(0, 3)?.join(", ")}
            </div>
          ) : null}
        </div>
      </div>
    </StyledText>
  );
};

const StyledText = styled.div`
  overflow: auto;
  margin-bottom: 15px;
  position: relative;
  max-height: 200px;
  &.only-text {
    max-height: 190px !important;
    margin-bottom: 0;
  }
  .edit-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    opacity: 0.4;
    border-radius: 8px;
    width: 28px;
    transition: all 0.3s;
    height: 28px;
    cursor: pointer;
    margin-left: 10px;
    z-index: 10;
    flex-shrink: 0;
    opacity: 0;
    &:hover {
      background: var(--bg-20) !important;
      opacity: 1 !important;
    }
  }
  &:hover {
    .edit-icon {
      opacity: 0.4;
    }
  }
  .main-title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
  }
  .index-overbuy {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 10px;
    font-weight: 200;
    /* text-align: right; */
  }
  .descr {
    margin: 20px 0 10px;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: var(--opacity-ligh);
    width: 100%;
    @media (min-width: 700px) {
      max-height: 130px;
      overflow: auto;
      /* white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis; */
    }
  }
  .tags-text {
    margin-top: 5px;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: var(--opacity-ligh);
  }
  .text-header {
    display: grid;
    grid-template-columns: 1fr 190px;
    gap: 10px;
  }
  .text-content {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 10px;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
    .text-content {
      display: grid;
      grid-template-columns: 280px max-content;
      width: max-content;
    }
    .text-header {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 800px) {
    .text-header {
      grid-template-columns: 1fr;
    }
  }
`;
