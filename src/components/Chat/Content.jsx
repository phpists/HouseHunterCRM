import { styled } from "styled-components";
import { Message } from "./Message/Message";
import { Photo } from "./Photo/Photo";
import { useEffect, useRef } from "react";
import noPhoto from "../../assets/images/no-photo.svg";
import { formatNumber, handleFormatDate } from "../../utilits";
import { useAppSelect } from "../../hooks/redux";

export const Content = ({ open, data, selected, onSelect, rieltorName }) => {
  const contentRef = useRef(null);
  const { user } = useAppSelect((state) => state.auth);

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
            if (msg?.messege?.title || msg?.messege?.img?.img) {
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
                    msg?.messege?.img?.img?.length > 0
                      ? msg?.messege?.img?.img
                      : noPhoto
                  }
                  text={text}
                  date={handleFormatDate(msg?.time * 1000)}
                  isOwner={msg?.id_user === user?.id}
                  onSelect={() =>
                    msg.id === selected?.id
                      ? onSelect(null)
                      : onSelect({ ...msg, text, id: i })
                  }
                  isSelected={selected?.id === i}
                  id={i}
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
                  date={handleFormatDate(msg?.time * 1000)}
                  isOwner={msg?.id_user === user?.id}
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
                  isSelected={selected?.id === i}
                  onSelect={() =>
                    i === selected?.id
                      ? onSelect(null)
                      : onSelect({ ...msg, text: msg?.messege ?? "", id: i })
                  }
                  idParent={msg?.id_parent}
                  parentMsg={data.find(
                    (m, j) => j.toString() === msg?.id_parent?.toString()
                  )}
                  onScrollToResponseMessage={() =>
                    handleScrollToMessage(msg?.id_parent)
                  }
                  id={i}
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
      background: #3d3d3d;
    }
  }

  .show-animation {
    opacity: 0.5;
  }
`;
