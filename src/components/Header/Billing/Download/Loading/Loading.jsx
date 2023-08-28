import { styled } from "styled-components";
import { File } from "./File";
import { Title } from "./Title";
import { LoadingBar } from "./LoadingBar/LoadingBar";
import { useEffect, useState } from "react";
import { LoadedMessage } from "./LoadedMessage";

export const Loading = ({ onLoaded }) => {
  const totalSize = 27;
  const [loadedSize, setLoadedSize] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDownloading = () => {
    setTimeout(() => {
      setLoadedSize(2);
    }, 400);
    setTimeout(() => {
      setLoadedSize(17);
    }, 1200);
    setTimeout(() => {
      setLoadedSize(27);
      setTimeout(() => {
        setIsLoaded(true);
        onLoaded(false);
      }, 200);
    }, 1800);
  };

  useEffect(() => {
    handleDownloading();
  }, []);

  return (
    <StyledLoading className="flex items-center">
      <File isLoaded={isLoaded} />
      <div className="flex flex-col items-start">
        <Title isLoaded={isLoaded} />
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
`;
