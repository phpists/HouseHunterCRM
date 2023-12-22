import { styled } from "styled-components";
import { Message } from "./Message/Message";
import { Photo } from "./Photo/Photo";
import { useEffect, useRef } from "react";
import noPhoto from "../../assets/images/no-photo.svg";
import { formatNumber } from "../../utilits";

export const Content = ({
  open,
  data,
  onOpenObject,
  loadingInfoMore,
  selected,
  onSelect,
  rieltorName,
}) => {
  const contentRef = useRef(null);

  const handleScrollToMessage = (id, toBottom) => {
    if (contentRef.current) {
      Array.from(contentRef.current.children).forEach((e, i) => {
        const elementId = Number(e.getAttribute("data-id"));
        if (elementId === Number(id) && e?.offsetTop && contentRef.current) {
          const isToBottom =
            toBottom && i === Array.from(contentRef.current.children).length - 1
              ? e.offsetHeight
              : 0;

          contentRef.current.scroll({
            top: e?.offsetTop - 100 + isToBottom,
          });
          e.classList.add("show-animation");
          setTimeout(() => e.classList.remove("show-animation"), 600);
        }
      });
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scroll({
        top: contentRef.current.scrollHeight,
      });
    }
  }, [open, data]);

  const handleClickOnContent = (e) => {
    if (e.target.classList.contains("content-wrapper")) {
      onSelect(null);
    }
  };

  useEffect(() => {
    if (selected) {
      handleScrollToMessage(selected?.id, true);
    }
  }, [selected]);

  return (
    <StyledContent
      ref={contentRef}
      className="content-wrapper"
      onClick={handleClickOnContent}
      selected={!!selected}
    >
      {data?.length > 0
        ? data.map((msg, i) => {
            if (msg?.messege?.title || msg?.messege?.img) {
              const text =
                msg?.messege?.title || msg?.messege?.price
                  ? `${msg?.messege?.title ?? "-"}, ${formatNumber(
                      msg?.messege?.price
                    )}`
                  : undefined;
              return (
                <Photo
                  key={i}
                  photo={
                    msg?.messege?.img?.length > 0 ? msg?.messege?.img : noPhoto
                  }
                  text={text}
                  date={msg?.date}
                  isOwner={msg?.user === 0}
                  onOpenObject={
                    msg?.messege?.id_object_hash &&
                    msg?.messege?.type &&
                    !loadingInfoMore
                      ? () =>
                          onOpenObject(
                            msg?.messege?.id_object_hash,
                            msg?.messege?.type,
                            msg?.messege?.state
                          )
                      : null
                  }
                  loading={loadingInfoMore === msg?.messege?.id_object_hash}
                  onSelect={() =>
                    msg.id === selected?.id
                      ? onSelect(null)
                      : onSelect({ ...msg, text })
                  }
                  isSelected={selected?.id === msg.id}
                  id={msg.id}
                  idParent={msg?.id_parent}
                  onScrollToResponseMessage={() =>
                    handleScrollToMessage(msg?.id_parent)
                  }
                />
              );
            } else if (msg?.messege) {
              return (
                <Message
                  key={i}
                  text={msg?.messege ?? ""}
                  date={msg?.date}
                  isOwner={msg?.user === 0}
                  first={
                    (!data[i - 1]?.messege?.image &&
                      !data[1 + i]?.messege?.image &&
                      data[i - 1]?.user !== msg?.user &&
                      data[1 + i]?.user === msg?.user) ||
                    ((data[i - 1]?.messege?.img ||
                      data[i - 1]?.messege?.title) &&
                      data[i - 1]?.user === msg.user)
                  }
                  between={
                    data[i - 1]?.user === msg?.user &&
                    data[1 + i]?.user === msg?.user &&
                    !data[i - 1]?.messege?.img &&
                    !data[1 + i]?.messege?.img &&
                    !data[i - 1]?.messege?.image &&
                    !data[1 + i]?.messege?.image
                  }
                  last={
                    data[i - 1]?.user === msg?.user &&
                    (data[1 + i]?.user !== msg?.user ||
                      data[1 + i]?.messege?.img) &&
                    !data[i - 1]?.messege?.image &&
                    !data[1 + i]?.messege?.image
                  }
                  isSelected={selected?.id === msg.id}
                  onSelect={() =>
                    msg.id === selected?.id
                      ? onSelect(null)
                      : onSelect({ ...msg, text: msg?.messege ?? "" })
                  }
                  idParent={msg?.id_parent}
                  parentMsg={data.find(
                    (m) => m.id.toString() === msg?.id_parent?.toString()
                  )}
                  onScrollToResponseMessage={() =>
                    handleScrollToMessage(msg?.id_parent)
                  }
                  id={msg.id}
                  rieltorName={rieltorName}
                />
              );
            }

            return null;
          })
        : null}
    </StyledContent>
  );
};

const StyledContent = styled.div`
  height: calc(100svh - 168px);
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 13px 0;
  ${({ selected }) => selected && "padding-bottom: 61px;"}
  div {
    &::after {
      background: #454545;
    }
  }

  .show-animation {
    opacity: 0.5;
  }
`;
