import styled from "styled-components";
import { SelectTags } from "../../SelectTags/SelectTags";
import { ProfileField } from "../../ProfileField";
import { useState } from "react";
import { useEffect } from "react";

export const Tags = ({ className, data }) => {
  const [tags, setTags] = useState([]);

  //   label_without_animals
  // :
  // "0"
  // label_without_children
  // :
  // "0"
  // label_without_foreigners
  // :
  // "0"
  // label_without_students
  // :

  const handleFormatTags = () => {
    const formatedData = data
      ? [
          ...(data?.label_without_animals === "1"
            ? [{ title: "Без тварин", value: "" }]
            : []),
          ...(data?.label_without_children === "1"
            ? [{ title: "Без дітей", value: "" }]
            : []),
          ...(data?.label_without_foreigners === "1"
            ? [{ title: "Без іноземців", value: "" }]
            : []),
          ...(data?.label_without_students === "1"
            ? [{ title: "Без студентів", value: "" }]
            : []),
        ]
      : [];

    setTags(formatedData);
  };

  useEffect(() => {
    handleFormatTags();
  }, [data]);

  console.log(tags);
  return (
    <StyledTags className={`flex flex-col hide-scroll clickable ${className}`}>
      <SelectTags label="Теги" showTags tags={tags} viewOnly />
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
