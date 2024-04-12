import styled from "styled-components";
import { IconButton } from "../../../components/IconButton";
import { useLazyDownloadObjectQuery } from "../../../store/objects/objects.api";
import { handleDownloadFile, handleResponse } from "../../../utilits";
import { useParams } from "react-router-dom";
import { ReactComponent as DownloadIcon } from "../../../assets/images/file.svg";

export const DownloadButton = () => {
  const { id } = useParams();
  const [downloadObject] = useLazyDownloadObjectQuery();

  const handleDownload = () => {
    downloadObject(id).then((resp) => {
      handleResponse(resp, () => {
        const link = resp?.data?.link;
        link && handleDownloadFile(link);
      });
    });
  };

  return (
    <StyledDownloadButton>
      <IconButton
        Icon={DownloadIcon}
        className="icon-btn"
        onClick={handleDownload}
      />
    </StyledDownloadButton>
  );
};

const StyledDownloadButton = styled.div`
  margin-right: 10px;
  .icon-btn {
    path {
      transition: all 0.3s;
      opacity: 0.5;
    }
    &:hover {
      path {
        opacity: 1;
      }
    }
  }
`;
