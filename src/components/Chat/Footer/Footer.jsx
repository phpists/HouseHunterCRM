import { useState } from "react";
import { styled } from "styled-components";
import { Input } from "./Input";
import { SendButton } from "./SendButton";

export const Footer = ({
  onRefreshData,
  selectedMessage,
  onCloseSelectedMessage,
  rieltorName,
}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (!loading && value.length > 0) {
      setLoading(true);
      const parentId = selectedMessage?.id.toString();
      //   if (parentId?.length > 0) {
      //     sendMessage(value, undefined, undefined, undefined, parentId).then(
      //       (resp) => {
      //         setValue("");
      //         onRefreshData();
      //         setLoading(false);
      //         onCloseSelectedMessage();
      //       }
      //     );
      //   } else {
      //     sendMessage(value).then((resp) => {
      //       setValue("");
      //       onRefreshData();
      //       setLoading(false);
      //     });
      //   }
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
  ${({ selectedMessage }) =>
    selectedMessage &&
    `
    padding: 4px;
    margin: 0 -7px;
    &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        background: #454545;
        height: 57px;
        left: 0;
    }
  `}
`;
