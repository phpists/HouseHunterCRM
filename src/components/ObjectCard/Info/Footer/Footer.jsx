import styled from "styled-components";
import { Tag } from "./Tag";
import { handleFormatDate } from "../../../../utilits";
import { useGetSourcesQuery } from "../../../../store/objects/objects.api";
import { ReactComponent as LikeIcon } from "../../../../assets/images/heart.svg";

export const Footer = ({
  createDate,
  dateEdit,
  id,
  idSource,
  nameSource,
  typeObject,
  dateDelete,
  className,
  onToggleFavoriteStatus,
  isFavorite,
}) => {
  const { data } = useGetSourcesQuery();

  return (
    <StyledFooter
      className={`flex flex-wrap items-end clickable ${className}`}
    >
      {id ? (
        <Tag
          title={`ID ${typeObject === "street_base" ? "Системи" : ""}`}
          copyValue={id}
          isCopy
        />
      ) : null}
      {idSource !== "0" && typeObject !== "company" ? (
        <>
          <Tag title={`ID на ресурсі`} copyValue={idSource} isCopy />{" "}
          {data?.[nameSource]?.length > 0 ? (
            <Tag title={data?.[nameSource] ?? ""} />
          ) : null}
        </>
      ) : null}

      <LikeIcon
        className={isFavorite && "active"}
        onClick={onToggleFavoriteStatus}
      />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  gap: 3px;
  margin-top: 10px;
  svg {
    height: 20px;
    width: 20px;
    margin-left: auto;
    opacity: 0.1;
    &.active {
      opacity: 1;
    }
  }
`;
