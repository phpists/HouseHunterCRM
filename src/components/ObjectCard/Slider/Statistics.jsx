import styled from "styled-components";
import { ReactComponent as HeartIcon } from "../../../assets/images/heart.svg";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye-icon.svg";

export const Statistics = ({ data }) => (
  <StyledStatistics className="flex items-center gap-2">
    <div className="flex items-center gap-1">
      <HeartIcon /> {data?.count_likes}
    </div>
    <div className="flex items-center gap-1">
      <EyeIcon className="!w-[20px] !h-[20px]" />
      {data?.count_views}
    </div>
  </StyledStatistics>
);

const StyledStatistics = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 10;
  padding: 1px 4px 2px 4px;
  border-radius: 5px;
  background: var(--element-bg);
  svg {
    height: 15px;
    width: 15px;
  }
`;
