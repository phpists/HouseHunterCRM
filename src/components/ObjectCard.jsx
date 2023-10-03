import { styled } from "styled-components";
import megafoneIcon from "../assets/images/megafon-object.svg";

export const ObjectCard = ({ photo, className, date }) => (
  <StyledObjectCard
    photo={photo}
    className={`flex flex-col items-center justify-center ${className} openInfo`}
  >
    {!photo && (
      <>
        <img src={megafoneIcon} alt="" className="0.5 openInfo" />
        <span className="openInfo">{date ?? "04.10"}</span>
      </>
    )}
  </StyledObjectCard>
);

const StyledObjectCard = styled.div`
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 3px;
  background: ${({ photo }) =>
    photo
      ? `url(${photo}) center/cover no-repeat !important`
      : "rgba(255, 255, 255, 0.2)"};
  transition: all 0.3s;
  border: 1px solid transparent;
  text-align: center;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: 125.182%; /* 13.77px */
  letter-spacing: 0.22px;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  margin-right: 5px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(126, 126, 126, 0.35);
    opacity: 0;
    transition: all 0.3s;
  }
  img,
  span {
    z-index: 2;
  }
  &:hover {
    border: 1px solid #fff;
    &::before {
      opacity: 1;
    }
  }
`;
