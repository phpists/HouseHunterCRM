import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as CheckboxIcon } from "../assets/images/checkbox.svg";

export const ProfileField = ({
  value,
  label,
  password,
  className,
  textarea,
  grey,
  big,
  contentHeight,
}) => {
  const [active, setActive] = useState(false);
  const textareaRef = useRef(null);

  const textAreaAdjust = (e) => {
    e.target.style.height = "1px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleToggleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef.current]);

  return (
    <StyledProfileField
      onClick={() => !active && setActive(true)}
      active={active}
      password={password}
      className={`${className}`}
      grey={grey}
      big={big}
    >
      <CheckboxIcon onClick={handleToggleActive} />
      {active ? (
        <>
          {textarea ? (
            <textarea
              className="value"
              defaultValue={value}
              ref={textareaRef}
              onChange={textAreaAdjust}
            />
          ) : (
            <input className="value" defaultValue={value} />
          )}
        </>
      ) : (
        <div className="value">{value}</div>
      )}
      {!big && (
        <>
          <div className="label">{active ? "Змінити" : label}</div>
          <div className="label label-hover">Змінити</div>
        </>
      )}
    </StyledProfileField>
  );
};

const StyledProfileField = styled.div`
  padding: ${({ big }) => (big ? "8px 11px 8px" : "8px 11px 9px")};
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  background: rgba(255, 255, 255, 0);
  background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.05) 50%
    )
    right;
  background-size: 210%;
  transition: 0.5s ease-out;
  .value {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    position: relative;
    transition: all 0.3s;
    ${({ password }) => password && " filter: blur(5px);"}
    ${({ big }) =>
      big &&
      `
        color: rgba(255, 255, 255, 0.40);
        font-family: Overpass;
        font-size: 20px;
        font-style: normal;
        font-weight: 100 !important;
        line-height: 118%; /* 23.6px */
        letter-spacing: 0.4px;
    `}
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }

  textarea {
    resize: none;
    width: 100%;
  }
  .label-hover {
    display: none;
  }

  svg {
    z-index: 10;
  }
  &:hover {
    background-position: left;
    .label {
      display: none;
    }
    .label-hover {
      display: block;
    }
    .value {
      filter: blur(0px);
    }
  }
  svg {
    position: absolute;
    top: 7px;
    right: 7px;
    cursor: pointer;
    transition: all 0.3s;
    visibility: hidden;
    opacity: 0;
    g {
      transition: all 0.3s;
    }
    ${({ big }) =>
      big &&
      `
       top: 50%;
       transform: translateY(-50%);
    `}
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
  ${({ active, grey }) =>
    active &&
    `
    background:  ${grey ? "rgba(255, 255, 255, 0.05)" : "#FFF"} !important;
    svg {
        opacity: 1;
        visibility: visible;
    }
    ${
      !grey
        ? `
        .value, .label {
            color: #2C2C2C;
            filter: blur(0px);
        }
    `
        : `
        path {
            fill: #FFF;
        }
    `
    }
  `}
`;
