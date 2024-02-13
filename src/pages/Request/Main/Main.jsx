import { useEffect, useRef } from "react";
import { Comment } from "./Comment";
import { Content } from "./Content";
import { Search } from "./Search/Search";
import { Name } from "./Name";
import { useGetRubricsQuery } from "../../../store/requests/requests.api";

export const Main = ({
  data,
  onChangeField,
  categories,
  onChangeCategories,
  fields,
  errors,
  onChangeErrors,
}) => {
  const contentRef = useRef(null);
  const { data: rubricsList } = useGetRubricsQuery();

  useEffect(() => {
    if (!!errors?.find((e) => e.id === "updated")) {
      const firstErrorField = document.querySelectorAll(
        ".request-main-wrapper .error-field"
      );
      if (firstErrorField[0]) {
        contentRef.current.scrollTo({
          top: firstErrorField[0].offsetTop - contentRef.current.offsetTop - 10,
        });
      }
    }
  }, [errors]);

  const handleChangeComment = (comment) => {
    onChangeField("general_group", { ...data?.general_group, comment });
    onChangeErrors(
      errors?.map((er) =>
        er.id === "general"
          ? { ...er, errors: er.errors?.filter((e) => e !== "comment") }
          : er
      )
    );
  };

  const handleChangeValue = (rubricId, fieldName, value) => {
    onChangeField(
      "fields",
      data?.fields.map((f) =>
        f.id_rubric === rubricId ? { ...f, [fieldName]: value } : f
      )
    );
    onChangeErrors(
      errors
        .map((e) =>
          e.id_rubric === rubricId
            ? { ...e, errors: e.errors.filter((f) => f !== fieldName) }
            : e
        )
        .filter((e) => e.id !== "updated")
    );
  };

  return (
    <div className="request-card  request-main-wrapper" ref={contentRef}>
      <Comment
        value={data?.general_group?.comment}
        onChange={handleChangeComment}
        error={
          !!errors
            ?.find((er) => er?.id === "general")
            ?.errors?.find((e) => e === "comment")
        }
      />
      {/* <Name
        value={data?.general_group?.name}
        onChange={(name) =>
          onChangeField("general_group", { ...data?.general_group, name })
        }
      /> */}
      <Content
        data={data}
        onChangeField={onChangeField}
        categories={categories}
        onChangeCategories={onChangeCategories}
        fields={fields}
        errors={errors}
        onChangeErrors={onChangeErrors}
      />
    </div>
  );
};
