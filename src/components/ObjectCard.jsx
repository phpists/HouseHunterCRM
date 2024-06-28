import { styled } from "styled-components";
import megafoneIcon from "../assets/images/megafon-object.svg";
import homeIcon from "../assets/images/home-gradient.svg";

export const ObjectCard = ({ photo, className, date, isObject }) => (
  <StyledObjectCard
    photo={photo}
    className={`flex flex-col items-center justify-center ${className} clickable`}
  >
    {!photo && (
      <>
        <img
          src={isObject ? homeIcon : megafoneIcon}
          alt=""
          className=" clickable 0.5 openInfo"
        />
        <span className="clickable openInfo date">{date ?? ""}</span>
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
    photo ? `url(${photo}) center/cover no-repeat !important` : "var(--bg-20)"};
  transition: all 0.3s;
  border: 1px solid transparent;
  text-align: center;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 125.182%; /* 13.77px */
  letter-spacing: 0.22px;
  color: var(--dark-90);
  position: relative;
  margin: 6px 5px 6px 6px;
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

  @media (max-width: 800px) {
    .date {
      font-size: 6px;
    }
  }
  @media (max-width: 450px) {
    .date {
      display: none;
    }
  }
`;
