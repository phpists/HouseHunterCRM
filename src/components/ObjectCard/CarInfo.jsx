import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Tag } from "./MainInfo/Tags/Tag";
import { AdTags } from "./Tags/AdTags/AdTags";
import { Tags } from "./Tags/Tags";
import { source } from "../../constants";
import { ReactComponent as ChatIcon } from "../../assets/images/chat-grey.svg";
import DaysOnSale from "../Car/DaysOnSale";

export const CarInfo = ({
  data,
  onOpenInfo,
  onUpdateField,
  noEdit,
  onChangeTags,
  onOpenCommentAutoria,
}) => {
  const textRef = useRef();
  const tagsRef = useRef();

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
      <div
        className="descr clickable !overflow-hidden"
        ref={textRef}
        onClick={(e) => {
          if (onOpenInfo) {
            e.stopPropagation();
            onOpenInfo();
          }
        }}
        style={{ maxHeight: 34 }}
      ></div>

      {data.comment_autoria?.length > 1 && (
        <div
          onClick={onOpenCommentAutoria}
          className={`hidden md:flex text-sm my-2 bg-[var(--tag-bg-2)] rounded px-2 py-3 ${
            data?.comment_autoria && "chat-active pulse"
          }`}
        >
          <div className="w-full">
            <div
              className="text-white/60"
              dangerouslySetInnerHTML={{
                __html: data.comment_autoria,
              }}
            ></div>
            <p className="text-white/60">
              дата додавання коментаря | {data.comment_autoria_days}
            </p>
          </div>
          <ChatIcon width={30} height={30} />
        </div>
      )}

      <div className="tags" ref={tagsRef}>
        <div className="!hidden md:!flex gap-2 items-center">
          <div className="flex gap-2">
            {data?.tag_faster !== "0" && (
              <Tag
                className="!text-xs !bg-red-500/20 !text-red-400"
                title={`Терміново`}
              />
            )}
            {data?.tag_market_bottom === "1" && (
              <Tag className="!text-xs" title={"Хороша ціна"} />
            )}
            {data?.tag_nativePaint && data?.tag_nativePaint === "1" && (
              <Tag className="!text-xs" title={"Рідна фарба"} />
            )}
            {data?.tag_exchangePossible !== "0" && (
              <Tag className="!text-xs" title={`Обмін`} />
            )}
            {data?.tag_freshlyDriven &&
              (data?.tag_freshlyDriven === "1") === "1" && (
                <Tag className="!text-xs" title={"Свіжопригнана"} />
              )}
            {data?.tag_afterDTP !== "0" && (
              <Tag className="!text-xs" title={`Після дтп`} />
            )}
          </div>

          <Tags
            data={data}
            onUpdateField={onUpdateField}
            noEdit={noEdit}
            onChangeTags={onChangeTags}
          />
        </div>

        <DaysOnSale carData={data} />
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
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
  }
  @media (max-width: 1110px) {
    grid-column: 1/3;
  }
`;
