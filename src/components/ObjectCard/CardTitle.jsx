import styled from "styled-components";
import editIcon from "../../assets/images/edit.svg";

export const CardTitle = ({ title = "-", editable, onEdit }) => (
  <StyledCardTitle className="clickable">
    {title}{" "}
    {editable ? (
      <div
        className="edit-icon flex items-center justify-center"
        onClick={onEdit}
      >
        <img src={editIcon} alt="" />
      </div>
    ) : null}
  </StyledCardTitle>
);

const StyledCardTitle = styled.div`
  color: #fff;
  /* H3 */
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  margin-bottom: 10px;
  @media (max-width: 800px) {
    word-break: break-all;
  }
  position: relative;
  .edit-icon {
    position: absolute;
    top: 0px;
    right: 0px;
    opacity: 0.4;
    border-radius: 8px;
    width: 28px;
    transition: all 0.3s;
    height: 28px;
    cursor: pointer;
    margin-left: 10px;
    z-index: 10;
    flex-shrink: 0;
    opacity: 0;
    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      opacity: 1 !important;
    }
  }
  &:hover {
    .edit-icon {
      opacity: 0.4;
    }
  }
`;
