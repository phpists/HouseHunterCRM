import { styled } from "styled-components";
import { Dropzone } from "./Dropzone";
import { Loading } from "./Loading/Loading";

export const Download = ({ download, onLoaded, onDownloading }) => {
  return (
    <StyledDownload>
      {download ? (
        <Loading onLoaded={onLoaded} />
      ) : (
        <Dropzone onDownload={onDownloading} />
      )}
    </StyledDownload>
  );
};

const StyledDownload = styled.div`
  margin-right: 12px;
`;
