import styled from "styled-components";
import { ReactComponent as EditIcon } from "../../../assets/images/edit.svg";
import { useEffect, useRef } from "react";

export const Text = ({ data, editable, onEdit, ad }) => {
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
      <div className="title clickable">
        {data?.title?.length > 0
          ? data?.title?.replaceAll("&amp;#039;", "'")
          : "-"}
        {editable ? (
          <div
            className="edit-icon flex items-center justify-center"
            onClick={onEdit}
          >
            <EditIcon />
          </div>
        ) : null}
      </div>
      <div className="descr clickable" ref={textRef}></div>
    </StyledText>
  );
};

const StyledText = styled.div`
  width: 400px;
  max-height: 97px;
  overflow: auto;
  margin-bottom: 15px;
  position: relative;
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
  .title {
    color: var(--main-color);
    /* H3 */
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
    margin-bottom: 10px;
  }
  .descr {
    overflow: hidden;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: var(--opacity-ligh);
    word-break: break-word;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (min-width: 1400px) {
    width: 180px;
  }
  @media (min-width: 1500px) {
    width: 280px;
  }
  @media (min-width: 1550px) {
    width: 330px;
  }
  @media (min-width: 1660px) {
    width: 330px;
  }
  @media (min-width: 1760px) {
    width: 420px;
  }
`;
