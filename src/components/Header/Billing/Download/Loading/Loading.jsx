import { styled } from "styled-components";
import { File } from "./File";
import { Title } from "./Title";
import { LoadingBar } from "./LoadingBar/LoadingBar";
import { useEffect, useState } from "react";
import { LoadedMessage } from "./LoadedMessage";

export const Loading = ({
  totalSize = 100,
  loadedSize,
  isLoaded,
  fileName,
}) => {
  return (
    <StyledLoading className="flex items-center">
      <File isLoaded={isLoaded} />
      <div className="flex flex-col items-start loading-content">
        <Title isLoaded={isLoaded} fileName={fileName} />
        {isLoaded ? (
          <LoadedMessage />
        ) : (
          <LoadingBar totalSize={totalSize} loadedSize={loadedSize} />
        )}
      </div>
    </StyledLoading>
  );
};

const StyledLoading = styled.div`
  border-radius: 9px;
  background: #313241;
  padding: 3px 11px 3px 3px;
  margin-right: 7px;
  width: 275px;
  .loading-content {
    overflow: hidden;
  }
  @media (max-width: 600px) {
    padding: 8px 21px;
    width: auto;
  }
`;
