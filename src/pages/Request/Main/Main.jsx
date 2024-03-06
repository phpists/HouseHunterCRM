import { useEffect, useRef } from "react";
import { Comment } from "./Comment";
import { Content } from "./Content";
import { Name } from "./Name";

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

  const handleChangeName = (name) => {
    onChangeField("general_group", { ...data?.general_group, name });
    onChangeErrors(
      errors?.map((er) =>
        er.id === "general"
          ? { ...er, errors: er.errors?.filter((e) => e !== "name") }
          : er
      )
    );
  };

  return (
    <div className="request-card  request-main-wrapper" ref={contentRef}>
      <Name
        value={data?.general_group?.name}
        onChange={handleChangeName}
        error={
          !!errors
            ?.find((er) => er?.id === "general")
            ?.errors?.find((e) => e === "name")
        }
      />
      <Comment
        value={data?.general_group?.comment}
        onChange={handleChangeComment}
        error={
          !!errors
            ?.find((er) => er?.id === "general")
            ?.errors?.find((e) => e === "comment")
        }
      />
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
