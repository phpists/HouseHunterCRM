import styled from "styled-components";
import { useEffect, useState } from "react";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import {
  useLazyGetAllCallsPhonesQuery,
  useLazyGetHistoryOrderQuery,
  useLazyGetOrderHistoryQuery,
  useLazySetOrderStatusQuery,
  useLazySetStatusTelegramOrderQuery,
} from "../../../../store/calls/calls.api";
import { handleFormatDate, handleResponse } from "../../../../utilits";
import cogoToast from "cogo-toast";

export const CallCard = ({
  selected,
  onSelect,
  openMore,
  onOpenMore,
  callType,
  phone,
  date,
  name,
  photo,
  comment,
  status,
  onSetStatus,
  onAddComment,
  level,
  onEditComment,
  onAdd,
  onSend,
  onSendCall,
  clientName,
  agentPhone,
  id,
  callCount,
  clientId,
  commentDate,
  telegram,
  downloadLink,
  idObject,
  chatId,
  statusText,
  xcorp,
  onEditHistoryComment,
}) => {
  const [open, setOpen] = useState();
  const [commentEdit, setCommentEdit] = useState(comment);
  const [getCalls, { data: callsData }] = useLazyGetAllCallsPhonesQuery();
  const [getHistoryOrder, { data: telegramCallsData }] =
    useLazyGetHistoryOrderQuery();
  const [getOrderHistory, { data: orderHistory }] =
    useLazyGetOrderHistoryQuery();
  const [setTelegramOrderStatus] = useLazySetStatusTelegramOrderQuery();
  const [setOrderStatus] = useLazySetOrderStatusQuery();

  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  const handleSubmitComment = () => {
    if (commentEdit !== comment) {
      onAddComment(commentEdit);
      setCommentEdit(comment);
    }
  };

  useEffect(() => {
    setCommentEdit(comment);
  }, [comment]);

  const handleToggleOpen = () => {
    if (!open) {
      if (!callsData && !telegramCallsData && !orderHistory) {
        if (xcorp) {
          getOrderHistory(id).then((resp) =>
            handleResponse(resp, () => {
              setOpen(true);
            })
          );
        } else if (telegram) {
          getHistoryOrder(chatId).then((resp) =>
            handleResponse(resp, () => {
              setOpen(true);
            })
          );
        } else {
          getCalls(phone).then((resp) =>
            handleResponse(resp, () => {
              setOpen(true);
            })
          );
        }
      } else {
        setOpen(true);
      }
    } else {
      setOpen(!open);
    }
  };

  const handleChangeTelegramOrderStatus = (id, status) => {
    if (status === "1") {
      setTelegramOrderStatus(id).then((resp) => {
        handleResponse(resp, () => {
          cogoToast.success("Статус успішно змінено!", {
            hideAfter: 3,
            position: "top-right",
          });
          getHistoryOrder(chatId);
        });
      });
    }
  };

  const handleChangeOrderStatus = (id, status) => {
    setOrderStatus({ id_order: id, status: status }).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success("Статус успішно змінено!", {
          hideAfter: 3,
          position: "top-right",
        });
        getOrderHistory(id);
      });
    });
  };

  return (
    <StyledCallCard
      className=" clickable"
      onClick={handleClick}
      selected={selected}
    >
      <DesktopContent
        open={open}
        onToggleOpen={handleToggleOpen}
        openMore={openMore}
        onOpenMore={onOpenMore}
        callType={callType}
        phone={phone}
        date={date}
        name={name}
        photo={photo}
        comment={commentEdit}
        onChangeComment={(val) => setCommentEdit(val)}
        onSubmitComment={handleSubmitComment}
        status={status}
        onSetStatus={onSetStatus}
        level={level}
        callsData={
          telegram
            ? telegramCallsData?.data?.map((c) => ({
                dt_incoming: handleFormatDate(Number(c.dt_order) * 1000),
                id: c?.id_order,
                status: c?.status,
                comment: c?.comment,
                date: Number(c.dt_order),
              })) ?? []
            : xcorp
            ? orderHistory?.data?.map((c) => ({
                dt_incoming: handleFormatDate(Number(c.dt_order) * 1000),
                id: c?.id,
                status: c?.status,
                comment: c?.comment,
                date: Number(c.dt_order),
              })) ?? []
            : callsData?.data ?? []
        }
        onEditComment={onEditComment}
        onAdd={onAdd}
        onSend={onSend}
        onSendCall={onSendCall}
        clientName={clientName}
        agentPhone={agentPhone}
        callCount={callCount}
        clientId={clientId}
        commentDate={commentDate}
        telegram={telegram}
        downloadLink={downloadLink}
        idObject={idObject}
        statusText={statusText}
        onChangeHistoryOrderStatus={
          xcorp ? handleChangeOrderStatus : handleChangeTelegramOrderStatus
        }
        xcorp={xcorp}
        onEditHistoryComment={(id, comment) =>
          onEditHistoryComment(
            id,
            comment,
            xcorp ? () => getOrderHistory(id) : () => getHistoryOrder(chatId)
          )
        }
      />
      <MobileContent
        open={open}
        onToggleOpen={handleToggleOpen}
        openMore={openMore}
        onOpenMore={onOpenMore}
        callType={callType}
        phone={phone}
        date={date}
        name={name}
        photo={photo}
        comment={commentEdit}
        onChangeComment={(val) => setCommentEdit(val)}
        onSubmitComment={handleSubmitComment}
        status={status}
        onSetStatus={onSetStatus}
        level={level}
        callsData={
          telegram
            ? telegramCallsData?.data?.map((c) => ({
                dt_incoming: handleFormatDate(Number(c.dt_order) * 1000),
                comment: c?.comment,
                id: c?.id_order,
                date: Number(c.dt_order),
              })) ?? []
            : xcorp
            ? orderHistory?.data?.map((c) => ({
                dt_incoming: handleFormatDate(Number(c.dt_order) * 1000),
                id: c?.id,
                status: c?.status,
                comment: c?.comment,
                date: Number(c.dt_order),
              })) ?? []
            : callsData?.data ?? []
        }
        onEditComment={onEditComment}
        onAdd={onAdd}
        onSend={onSend}
        onSendCall={onSendCall}
        clientName={clientName}
        agentPhone={agentPhone}
        callCount={callCount}
        clientId={clientId}
        commentDate={commentDate}
        telegram={telegram}
        downloadLink={downloadLink}
        idObject={idObject}
        statusText={statusText}
        onChangeHistoryOrderStatus={
          xcorp ? handleChangeOrderStatus : handleChangeTelegramOrderStatus
        }
        xcorp={xcorp}
        onEditHistoryComment={(id, comment) =>
          onEditHistoryComment(
            id,
            comment,
            xcorp ? () => getOrderHistory(id) : () => getHistoryOrder(chatId)
          )
        }
      />
    </StyledCallCard>
  );
};

const StyledCallCard = styled.div`
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0);
  transition: all 0.3s;
  position: relative;
  &:hover {
    border: var(--second-color-border);
  }

  ${({ selected }) =>
    selected &&
    `
      border: 1px solid var(--color-2) !important;
  `}

  @media (max-width:1500px) {
    padding: 10px;
  }
`;
