import styled from "styled-components";
import { SelectTags } from "../../SelectTags/SelectTags";
import { ProfileField } from "../../ProfileField";
import { useState } from "react";
import { useEffect } from "react";
import {
  useGetCommentsToFieldsQuery,
  useGetTagsListQuery,
  useLazyAddTagsToObjectsQuery,
} from "../../../store/objects/objects.api";
import { handleResponse } from "../../../utilits";

export const Tags = ({ className, data, isAccess }) => {
  const { data: tagsList } = useGetTagsListQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [addTag] = useLazyAddTagsToObjectsQuery();
  const [tags, setTags] = useState([]);

  const handleSelect = (val) => {
    const isExist = !!tags?.find((t) => t.value === val);

    addTag({
      actions: isExist ? "0" : "1",
      tags: val,
      id_object: data?.id,
    }).then((resp) =>
      handleResponse(resp, () => {
        setTags(
          isExist
            ? tags?.filter((t) => t.value !== val)
            : [
                ...tags,
                { title: commentsToFields?.object[val] ?? "-", value: val },
              ]
        );
      })
    );
  };

  const handleGetInitTags = () => {
    let initTags = [];

    tagsList?.data?.forEach((tag) => {
      if (data[tag] === "1") {
        initTags.push({
          title: commentsToFields?.object[tag] ?? "-",
          value: tag,
        });
      }
    });

    setTags(initTags);
  };

  useEffect(() => {
    if (data && tagsList && commentsToFields) {
      handleGetInitTags();
    }
  }, [data, tagsList, commentsToFields]);

  return (
    <StyledTags className={`flex flex-col hide-scroll clickable ${className}`}>
      <SelectTags
        label="Теги"
        showTags
        tags={tags}
        options={tagsList?.data?.map((value) => ({
          title: commentsToFields?.object[value] ?? "-",
          value,
        }))}
        onChange={handleSelect}
      />
      {data?.comment && (
        <ProfileField
          label="Коментар"
          value={data?.comment}
          className="comment"
          contentHeight
          readOnly
        />
      )}
    </StyledTags>
  );
};

const StyledTags = styled.div`
  padding: 8px;
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.8);
  width: 200px;
  margin-right: 10px;
  height: 200px;
  overflow: auto;
  .comment {
    margin-top: 8px;
    max-width: 200px;
    .value {
      font-size: 12px;
    }
    .label {
      font-size: 11px;
    }
  }
  @media (min-width: 1400px) {
    width: 195px;
  }
  @media (min-width: 1600px) {
    width: 200px;
  }
  @media (min-width: 1700px) {
    width: 18svw;
  }
  @media (max-width: 1399.9px) {
    width: calc((100% - 210px - 40px) / 2);
    height: 250px;
    margin-right: 18px;
  }
`;
