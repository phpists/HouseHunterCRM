import { useEffect, useRef } from "react";
import { Comment } from "./Comment";
import { Content } from "./Content";
import { Search } from "./Search/Search";

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

  return (
    <div
      className="request-card hide-scroll request-main-wrapper"
      ref={contentRef}
    >
      <Comment
        value={data?.comment}
        onChange={(val) => onChangeField("comment", val)}
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
      {/* <Search /> */}
    </div>
  );
};
