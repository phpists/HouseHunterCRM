import styled from "styled-components";
import { SelectTags } from "../../SelectTags/SelectTags";
import { ProfileField } from "../../ProfileField";
import { useState } from "react";
import { useEffect } from "react";
import {
  useGetCommentsToFieldsQuery,
  useGetTagsListQuery,
  useLazyAddTagsToObjectsQuery,
  useLazyAddTagsToStreetBaseObjectsQuery,
} from "../../../store/objects/objects.api";
import { handleResponse } from "../../../utilits";
import { Comment } from "./Comment";

export const Tags = ({ className, data, isAccess }) => {
  const { data: tagsList } = useGetTagsListQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [addTag] = useLazyAddTagsToObjectsQuery();
  const [addTagStreetBase] = useLazyAddTagsToStreetBaseObjectsQuery();
  const [tags, setTags] = useState([]);
  const [comment, setComment] = useState("");

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

    data?.tags?.forEach((tag) => {
      initTags.push({
        title: commentsToFields?.object[tag] ?? "-",
        value: tag,
      });
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
      <Comment id={data?.id} comment={data?.comment} />
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
