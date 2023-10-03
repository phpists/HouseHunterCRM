import styled from "styled-components";
import { Title } from "./Title";
import { Filter } from "../../../../components/Filter/Filter";
import { ReactComponent as StarIcon } from "../../../../assets/images/card-star.svg";
import { IconButton } from "../../../../components/IconButton";

export const MobileHeader = () => {
  return (
    <StyledMobileHeader className="flex items-center justify-between">
      <Title />
      <div className="flex items-center">
        <Filter className="header-btn" />
        <IconButton Icon={StarIcon} className=" icon-btn" onClick={null} />
      </div>
    </StyledMobileHeader>
  );
};

const StyledMobileHeader = styled.div`
  margin-bottom: 20px;
  .icon-btn {
    margin-left: 15px;
  }
  @media (min-width: 700px) {
    display: none;
  }
`;
