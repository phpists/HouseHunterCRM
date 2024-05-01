import { styled } from "styled-components";
import phoneIcon from "../../assets/images/call.svg";
import { handleCopy } from "../../utilits";

export const Phone = ({
  showOnHoverIcon,
  className,
  phone,
  isLessThenOne,
  readOnly,
  hideIcon,
  small,
  onClick,
}) => (
  <StyledPhone
    className={`${className} notClickable ${isLessThenOne && "less-then-one"}`}
    onClick={onClick}
  >
    <div className="flex items-center notClickable">
      <div
        className="phone notClickable"
        onClick={() => (readOnly ? null : handleCopy(phone))}
      >
        {phone}
      </div>
      {hideIcon ? null : readOnly ? (
        <img src={phoneIcon} alt="" className="notClickable" />
      ) : (
        <a href={`tel:${phone}`}>
          {/* <img src={phoneIcon} alt="" className="notClickable" /> */}
        </a>
      )}
    </div>
    {!small ? <div className="subtitle notClickable">Телефон</div> : null}
  </StyledPhone>
);

const StyledPhone = styled.div`
  color: var(--main-color);
  transition: all 0.3s;
  background: var(--card-bg-3);
  padding: 7px 7.51px 6px;
  border-radius: 6px 0px 0px 6px;
  display: block !important;
  &.less-then-one {
    border-radius: 6px !important;
  }
  .phone {
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }
  .subtitle {
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  img {
    margin-left: 15px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }
  &:hover {
    background: var(--hover-card-2);
    img {
      opacity: 1;
      visibility: visible;
    }
  }
`;
