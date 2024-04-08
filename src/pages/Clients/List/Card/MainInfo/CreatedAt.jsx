import { styled } from "styled-components";
import { handleFormatDate } from "../../../../../utilits";

export const CreatedAt = ({ dateCreate, isDeleted, deleteDate }) => (
  <StyledCreatedAt className={`${isDeleted && "deleted"}`}>
    {isDeleted ? (
      <>
        Видалений
        {deleteDate !== "0" ? (
          <>
            <br />
            остаточне видалення
            <span className="ml-1">
              {handleFormatDate(Number(deleteDate) * 1000, true)}
            </span>
          </>
        ) : (
          ""
        )}
      </>
    ) : (
      <> Створений {handleFormatDate(Number(dateCreate) * 1000)}</>
    )}
  </StyledCreatedAt>
);

const StyledCreatedAt = styled.div`
  margin-top: 2px;
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
  &.deleted {
    color: #f94343;
    font-weight: 600;
    opacity: 1;
  }
`;
