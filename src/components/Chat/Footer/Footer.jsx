import { useState } from "react";
import { styled } from "styled-components";
import { Input } from "./Input";
import { SendButton } from "./SendButton";
import {
  useLazyAddMessageClientQuery,
  useLazyAddMessageQuery,
} from "../../../store/selections/selections.api";
import { handleResponse } from "../../../utilits";

export const Footer = ({
  onRefreshData,
  selectedMessage,
  onCloseSelectedMessage,
  rieltorName,
  requestObjectId,
}) => {
  const [addMessage] = useLazyAddMessageQuery();
  //   const [addMessage] = useLazyAddMessageClientQuery();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (img) => {
    if (!loading && (value.length > 0 || img)) {
      setLoading(true);
      const id_parent = selectedMessage?.id.toString();

      addMessage({
        id_request_group: requestObjectId,
        ...(img ? { img } : { messege: value }),
        show_object: "",
        id_parent,
        ...(img ? { img } : {}),
      }).then((resp) =>
        handleResponse(
          resp,
          () => {
            onRefreshData();
            setLoading(false);
            setValue("");
          },
          () => {
            setLoading(false);
            setValue("");
          }
        )
      );
    }
  };

  return (
    <StyledFooter
      className="flex items-center"
      selectedMessage={!!selectedMessage}
    >
      <Input
        value={value}
        onChange={(value) => setValue(value)}
        onRefreshData={onRefreshData}
        loading={loading}
        selectedMessage={selectedMessage}
        onCloseSelectedMessage={onCloseSelectedMessage}
        rieltorName={rieltorName}
        onSendFile={handleSendMessage}
        onSend={handleSendMessage}
      />
      <SendButton onSend={handleSendMessage} loading={loading} />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  margin: 0 4px;
  position: relative;
  z-index: 400;
  transition: all 0.3s;
  position: absolute;
  bottom: 20px;
  right: 0px;
  left: 0px;
  padding: 0 20px;
  ${({ selectedMessage }) =>
    selectedMessage &&
    `
    padding: 4px;
    // margin: 0 -7px;
    &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        background: var(--chat-bg);
        height: 100px;
        left: 0;
    }
  `}
`;
