import styled from "styled-components";
import { SelectTags } from "../../SelectTags/SelectTags";
import { useRef, useState } from "react";
import { useEffect } from "react";
import {
  useGetCommentsToFieldsQuery,
  useGetTagsListQuery,
  useLazyAddNotepadTagQuery,
  useLazyAddTagsToObjectsQuery,
} from "../../../store/objects/objects.api";
import { handleFormatDate, handleResponse } from "../../../utilits";
import { Comment } from "./Comment";
import { TAGS, SELECTION_TAGS } from "../../../constants";
import { useParams } from "react-router-dom";
import { AdTags } from "./AdTags/AdTags";
import { AutoriaComment } from "./AutoriaComment";
import { Price } from "../Info/Price";
import { Tag } from "../MainInfo/Tags/Tag";
import { Dropdown } from "../../Select/Dropdown/Dropdown";

export const Tags = ({
  className,
  data,
  isAccess,
  onChangeComment,
  selections,
  onChangeTags,
  ad,
  onUpdateField,
  noEdit,
}) => {
  const { id } = useParams();
  const { data: tagsList } = useGetTagsListQuery({
    only_notepad: selections ? "1" : undefined,
  });
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [addTag] = useLazyAddTagsToObjectsQuery();
  const [addNotepadTag] = useLazyAddNotepadTagQuery();
  const [tags, setTags] = useState([]);
  const [actualDate, setActualDate] = useState(null);
  const actualTags = ["label_is_actual", "label_not_actual"];
  const isFirstRender = useRef(true);
  const buttonRef = useRef();

  const ADDITIONAL_TAGS = {
    label_top: "Топ",
    label_recomendation: "Рекомендація",
    label_showing: "Показується",
  };
  const handleSelect = (val) => {
    const isExist = !!tags?.find((t) => t.value === val);
    const isSelectionTag = SELECTION_TAGS?.find((t) => t.value === val);

    if (buttonRef.current) {
      buttonRef.current.blur();
    }
    if (isSelectionTag) {
      addNotepadTag({
        // actions: isExist ? "0" : "1",
        label_name: val,
        id_object: data?.id,
        id_request_group: id,
      }).then((resp) =>
        handleResponse(resp, () => {
          setTags(
            isExist
              ? tags?.filter((t) => t.value !== val)
              : [...tags, isSelectionTag]
          );
        })
      );
    } else {
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

          const updatedTags = isExist
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
              ];

          setTags(updatedTags);
          onChangeTags(
            "tags",
            updatedTags?.map((t) => t.value)
          );
        })
      );
    }
  };

  const handleGetInitTags = () => {
    let initTags = [];

    data?.tags?.forEach((tag) => {
      initTags.push({
        title:
          `${commentsToFields?.object[tag] ?? ADDITIONAL_TAGS[tag]} ${
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

  console.log(tags);
  return (
    <>
      {ad ? null : (
        <>
          {tags?.map(({ title, value }) => (
            <Tag
              title={title}
              onRemove={() => handleSelect(value)}
              className="green"
            />
          ))}
          <StyledTags
            className="relative"
            onClick={(e) => e.stopPropagation()}
            ref={buttonRef}
          >
            <Tag title="+" />
            <Dropdown
              options={[
                ...(tagsList?.data?.map((value) => ({
                  title:
                    commentsToFields?.object[value] ??
                    ADDITIONAL_TAGS[value] ??
                    "-",
                  value,
                })) ?? []),
              ]}
              onChange={handleSelect}
            />
          </StyledTags>
          {/* <SelectTags
            label="Теги"
            showTags
            tags={tags}
            options={[
              ...(tagsList?.data?.map((value) => ({
                title:
                  commentsToFields?.object[value] ??
                  ADDITIONAL_TAGS[value] ??
                  "-",
                value,
              })) ?? []),
              //   ...(selections ? SELECTION_TAGS : []),
            ]}
            onChange={handleSelect}
            hide
          /> */}
        </>
      )}
    </>
  );
};

const StyledTags = styled.button`
  &:focus {
    .selectDropdown {
      visibility: visible;
      opacity: 1;
      width: 250px;
      border-radius: 10px;
      text-align: left;
    }
  }
`;
