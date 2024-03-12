import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProfileField } from "../../ProfileField";

export const Comment = ({ id, comment, onChangeComment }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(typeof comment === "string" ? comment : "");
  }, [comment]);

  return (
    <StyledComment>
      <ProfileField
        label="Коментар"
        placeholder="Введіть коментар"
        value={value}
        onChange={(val) => setValue(val)}
        className="comment"
        onClick={onChangeComment}
        readOnly
      />
    </StyledComment>
  );
};

const StyledComment = styled.div`
  margin-top: 8px;
  /* max-width: 200px; */
  .value {
    font-size: 12px;
  }
  .label {
    font-size: 11px;
  }
`;
