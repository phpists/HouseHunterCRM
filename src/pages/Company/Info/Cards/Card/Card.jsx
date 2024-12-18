import { useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit-company.svg";
import { ReactComponent as Arrow } from "../../../../../assets/images/check.svg";

export const Card = ({
  title,
  subtitle,
  Icon,
  hoverBackground,
  hoverSubtitle,
  editable,
  onEdit,
}) => {
  const [edit, setEdit] = useState(false);

  const handleSave = (e) => {
    const value = e.target.value;
    if (title !== value && value?.length > 0) {
      onEdit(value);
    }
    setEdit(false);
  };

  return (
    <StyledCard
      className="flex items-start justify-between card"
      hoverBackground={hoverBackground}
      hoverSubtitle={hoverSubtitle}
      onClick={() => (editable && !edit ? setEdit(true) : null)}
    >
      <div>
        <div className="title">
          {edit ? (
            <input
              type="number"
              defaultValue={title}
              onBlur={handleSave}
              autoFocus
              onKeyDown={(e) => e?.keyCode === 13 && handleSave(e)}
            />
          ) : title?.length > 0 ? (
            title
          ) : (
            "0"
          )}
        </div>
        <div className="subtitle-wrapper">
          <div className="subtitle">{subtitle}</div>
          <div className="subtitle subtitle-hover">{hoverSubtitle}</div>
        </div>
      </div>
      {editable ? (
        <>
          {!edit ? (
            <div>
              <EditIcon className="hover" />
              <Icon className="notHover" />
            </div>
          ) : (
            <Arrow />
          )}
        </>
      ) : (
        <Icon />
      )}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 8px 8px 9px 9px;
  transition: all 0.3s;
  background: var(--bg-10);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .hover {
    display: none;
  }

  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
    position: relative;
    z-index: 10;
  }
  .subtitle {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 120.182%; /* 13.22px */
    letter-spacing: 0.22px;
    opacity: 0.4;
    transition: all 0.3s;
  }
  .subtitle-wrapper {
    position: relative;
  }
  svg {
    height: 18px;
  }
  svg,
  g,
  path {
    transition: all 0.3s;
    z-index: 1000;
  }

  .subtitle-hover {
    opacity: 0;
    visibility: hidden;
    transform: translateX(15px);
    position: absolute;
    top: 0;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${({ hoverBackground }) => hoverBackground}) left/cover
      no-repeat;
    top: 0;
    opacity: 0;
    transition: all 0.3s;
  }

  &:hover {
    background: var(--bg-15);
    .hover {
      display: block;
    }
    .notHover {
      display: none;
    }
    .subtitle {
      ${({ hoverSubtitle }) =>
        hoverSubtitle &&
        `
         opacity: 0;
        visibility: hidden;
        transform: translateX(-15px);
      `}
    }
    .subtitle-hover {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);
      display: block;
    }
    svg,
    g,
    path {
      opacity: 1;
    }
    &:before {
      opacity: 1;
    }
  }
  @media (max-width: 600px) {
    background: var(--card-bg-2);
    svg {
      position: absolute;
      top: 11px;
      right: 9px;
    }
  }
`;
