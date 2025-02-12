import styled from "styled-components";
import { useRef, useState } from "react";
import { useEffect } from "react";
import {
  useGetCommentsToFieldsQuery,
  useGetTagsListQuery,
  useLazyAddTagsToObjectsQuery,
} from "../../../store/objects/objects.api";
import { handleFormatDate, handleResponse } from "../../../utilits";
import { TAGS } from "../../../constants";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import { useParams } from "react-router-dom";

export const Tags = ({ className, data, isAccess, onToggleOpen }) => {
  const { id } = useParams();
  const { data: tagsList } = useGetTagsListQuery({ only_notepad: undefined });
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [addTag] = useLazyAddTagsToObjectsQuery();
  const [tags, setTags] = useState([]);
  const [actualDate, setActualDate] = useState(null);
  const actualTags = ["label_is_actual", "label_not_actual"];

  const handleSelect = (val) => {
    const isExist = !!tags?.find((t) => t.value === val);

    addTag({
      actions: isExist ? "0" : "1",
      tags: val,
      id_object: id,
    }).then((resp) =>
      handleResponse(resp, () => {
        if (actualTags?.includes(val)) {
          setActualDate(isExist ? new Date() : null);
          if (
            !!tags.find((t) =>
              actualTags?.filter((a) => a !== val).includes(t.value)
            ) &&
            !isExist
          ) {
            addTag({
              actions: "0",
              tags:
                val === "label_is_actual"
                  ? "label_not_actual"
                  : "label_is_actual",
              id_object: data?.id,
            });
          }
        }

        setTags(
          isExist
            ? tags?.filter((t) => t.value !== val)
            : [
                ...tags?.filter((t) =>
                  actualTags?.includes(val)
                    ? t.value !== "label_is_actual" &&
                      t.value !== "label_not_actual"
                    : true
                ),
                {
                  title: commentsToFields?.object[val]
                    ? `${commentsToFields?.object[val]} ${
                        actualTags.includes(val)
                          ? handleFormatDate(new Date())
                          : ""
                      }`
                    : "-",
                  value: val,
                },
              ]
        );
      })
    );
  };

  const handleGetInitTags = () => {
    let initTags = [];
    let tagsValue = [];

    if (data?.label_dtp === "1") {
      tagsValue.push("label_dtp");
    }
    if (data?.label_exchangePossible === "1") {
      tagsValue.push("label_exchangePossible");
    }
    if (data?.label_faster === "1") {
      tagsValue.push("label_faster");
    }
    if (data?.label_nativePaint === "1") {
      tagsValue.push("label_nativePaint");
    }

    tagsValue?.forEach((tag) => {
      initTags.push({
        title:
          `${commentsToFields?.object[tag]} ${
            actualTags.includes(tag)
              ? data?.dt_add_tags_actuals
                ? handleFormatDate(Number(data?.dt_add_tags_actuals) * 1000)
                : ""
              : ""
          }` ?? "-",
        value: tag,
      });
    });

    setTags(initTags);
  };

  const handleSetActualTagsDate = () => {
    const date = data?.dt_add_tags_actuals;
    if (date && date !== 0) {
      setActualDate(new Date(Number(date) * 1000));
    }
  };

  useEffect(() => {
    if (data && tagsList && commentsToFields) {
      handleGetInitTags();
      handleSetActualTagsDate();
    }
  }, [data, tagsList, commentsToFields]);

  return (
    <StyledTags
      className={`flex flex-col hide-scroll clickable selectTagsWrapper ${className}`}
    >
      <SelectTags
        label="Теги"
        showTags
        tags={tags}
        options={
          tagsList?.data
            ? tagsList?.data?.map((value) => ({
                title: commentsToFields?.object[value] ?? "-",
                value,
              }))
            : []
        }
        onChange={handleSelect}
        onToggleOpen={onToggleOpen}
        hide
      />
    </StyledTags>
  );
};

const StyledTags = styled.div``;
