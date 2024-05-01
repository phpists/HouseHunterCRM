import styled from "styled-components";
import editIcon from "../../../assets/images/edit.svg";

export const Text = ({ data, editable, onEdit }) => {
  return (
    <StyledText className="hide-scroll clickable">
      <div className="title clickable">
        {data?.title?.length > 0 ? data?.title : "-"}
        {editable ? (
          <div
            className="edit-icon flex items-center justify-center"
            onClick={onEdit}
          >
            <img src={editIcon} alt="" />
          </div>
        ) : null}
      </div>
      <div className="descr clickable">
        {data?.description?.length > 0 ? data?.description : "-"}
      </div>
    </StyledText>
  );
};

const StyledText = styled.div`
  width: 400px;
  max-height: 130px;
  overflow: auto;
  margin-bottom: 15px;
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
      background: var(--bg-20) !important;
      opacity: 1 !important;
    }
  }
  &:hover {
    .edit-icon {
      opacity: 0.4;
    }
  }
  .title {
    color: var(--main-color);
    /* H3 */
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
    margin-bottom: 10px;
  }
  .descr {
    overflow: hidden;
    color: var(--main-color);
    text-overflow: ellipsis;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: 0.4;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (min-width: 1400px) {
    width: 240px;
    height: 130px;
  }
  @media (min-width: 1600px) {
    width: 400px;
  }
`;
