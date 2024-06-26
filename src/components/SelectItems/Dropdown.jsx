import { styled } from "styled-components";

export const Dropdown = ({
  onSelect,
  noFavorite,
  onDelete,
  onHide,
  onOpen,
  onSend,
  isHideObjects,
  onAddToSelection,
  onRestore,
  onDeleteFinally,
  onSendClients,
  onFastCopy,
}) => {
  const OPTIONS = [
    { title: "Додати в улюблене", value: "favorite" },
    ...(onSend ? [{ title: "Передати", value: "send" }] : []),
    ...(onSendClients
      ? [{ title: "Передати клієнта", value: "sendClients" }]
      : []),
    ...(onRestore ? [{ title: "Відновити", value: "restore" }] : []),
    ...(onDelete ? [{ title: "Видалити", value: "delete" }] : []),
    ...(onDeleteFinally
      ? [{ title: "Видалити остаточно", value: "deleteFinally" }]
      : []),
    ...(onHide
      ? [{ title: isHideObjects ? "Показати" : "Приховати", value: "hide" }]
      : []),
    ...(onAddToSelection
      ? [{ title: "Додати до підбірки", value: "selection" }]
      : []),
    ...(onFastCopy ? [{ title: "Швидка підбірка", value: "onFastCopy" }] : []),
  ];

  return (
    <StyledDropdown>
      {OPTIONS.filter((opt) =>
        noFavorite ? opt.value !== "favorite" : true
      ).map((opt, i) => (
        <div key={i} onClick={() => onSelect(opt.value)}>
          {opt.title}
        </div>
      ))}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  background: var(--bg-10);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  backdrop-filter: blur(18.5px);
  z-index: 100;
  text-align: left;
  div {
    color: var(--second-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    padding: 7px 12px 5px;
    transition: all 0.3s;
    cursor: pointer;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    &:hover {
      opacity: 1;
      background: var(--bg-10);
      color: var(--main-color);
    }
  }
  div:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
