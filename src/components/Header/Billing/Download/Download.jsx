import { styled } from "styled-components";
import { Dropzone } from "./Dropzone";
import { Loading } from "./Loading/Loading";
import { useLazyPayByBankQuery } from "../../../../store/billing/billing.api";
import { useState } from "react";
import { formatBytes, handleResponse, showAlert } from "../../../../utilits";

export const Download = ({
  download,
  onLoaded,
  onDownloading,
  refetchBalance,
  value,
  onClose,
}) => {
  const [payByBank] = useLazyPayByBankQuery();
  const [loadedSize, setLoadedSize] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [fileName, setFileName] = useState("");

  const handleDownloadFile = (file) => {
    if (value > 0) {
      if (file?.size < 30000000) {
        onDownloading();
        setTotalSize(formatBytes(file?.size));
        setFileName(file?.name ?? "file");
        setLoadedSize(file?.size / 4);
        payByBank({ ammount: value, payment: file }).then((resp) =>
          handleResponse(
            resp,
            () => {
              setIsLoaded(file?.size);
              setIsLoaded(true);
              setTimeout(() => {
                refetchBalance();
                onClose();
                showAlert("success", "Успішно поповнено");
              }, 2000);
            },
            () => {
              onClose();
            }
          )
        );
      } else {
        showAlert("error", "Файл розміром більше 30 МБ");
      }
    } else {
      showAlert("error", "Введіть суму поповнення");
    }
  };

  return (
    <StyledDownload>
      {download ? (
        <Loading
          onLoaded={onLoaded}
          loadedSize={loadedSize}
          isLoaded={isLoaded}
          totalSize={totalSize}
          fileName={fileName}
        />
      ) : (
        <Dropzone onDownload={handleDownloadFile} />
      )}
    </StyledDownload>
  );
};

const StyledDownload = styled.div`
  margin-right: 12px;
`;
