import styled from "styled-components";
import { ReactComponent as EditIcon } from "../../../assets/images/edit.svg";
import { useEffect, useRef } from "react";
import { Price } from "./Price";
import { Tags } from "../MainInfo/Tags/Tags";

export const Text = ({ data, editable, onEdit, ad, onOpenInfo }) => {
  const textRef = useRef();

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
    <StyledText className={`hide-scroll clickable ${ad && "only-text"}`}>
      <div className="text-header">
        <div>
          <div
            className="main-title clickable"
            onClick={(e) => {
              if (onOpenInfo) {
                e.stopPropagation();
                onOpenInfo();
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
          <Tags data={data} />
        </div>
        <Price data={data} />
        <div></div>
      </div>
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
    /* H3 */
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
  }
  .descr {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: var(--opacity-ligh);
    @media (min-width: 700px) {
      width: calc(100svw - 250px);
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (min-width: 1400px) {
      width: calc(100svw - 1029px);
    }
  }
  .text-header {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 10px;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
`;
