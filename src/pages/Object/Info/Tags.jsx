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

export const Tags = ({ className, data, isAccess }) => {
  const { data: tagsList } = useGetTagsListQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [addTag] = useLazyAddTagsToObjectsQuery();
  const [tags, setTags] = useState([]);
  const [actualDate, setActualDate] = useState(null);
  const actualTags = ["label_is_actual", "label_not_actual"];
  const isFirstRender = useRef(true);

  const handleSelect = (val) => {
    const isExist = !!tags?.find((t) => t.value === val);

    addTag({
      actions: isExist ? "0" : "1",
      tags: val,
      id_object: data?.id,
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

    data?.tags?.forEach((tag) => {
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
    if (data && tagsList && commentsToFields && isFirstRender.current) {
      handleGetInitTags();
      handleSetActualTagsDate();
      isFirstRender.current = false;
    }
  }, [data, tagsList, commentsToFields]);

  return (
    <StyledTags className={`flex flex-col hide-scroll clickable ${className}`}>
      <SelectTags
        label="Теги"
        showTags
        tags={tags}
        options={TAGS?.map((value) => ({
          title: commentsToFields?.object[value] ?? "-",
          value,
        }))}
        onChange={handleSelect}
      />
    </StyledTags>
  );
};

const StyledTags = styled.div``;
