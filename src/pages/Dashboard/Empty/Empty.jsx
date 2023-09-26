import styled from "styled-components";
import { WelcomeBanner } from "../WelcomeBanner/WelcomeBanner";
import { useState } from "react";
import { EmptyBlock } from "./EmptyBlock";

export const Empty = () => {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <StyledEmpty className="flex flex-col">
      {bannerVisible && (
        <WelcomeBanner onClose={() => setBannerVisible(false)} />
      )}
      <EmptyBlock />
    </StyledEmpty>
  );
};

const StyledEmpty = styled.div`
  width: 100%;
  height: calc(100svh - 145px);
`;
