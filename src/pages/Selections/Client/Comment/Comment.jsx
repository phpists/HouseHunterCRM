import { useEffect, useState } from "react";
import styled from "styled-components";
import { EditComment } from "./EditComment";

export const Comment = ({ comment }) => {
  const [open, setOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    setCommentValue(comment ?? "");
  }, [comment]);

  return (
    <div>
      {open && (
        <EditComment
          onClose={() => setOpen(false)}
          comment={commentValue}
          onChange={(val) => setCommentValue(val)}
        />
      )}
      <StyledComment onClick={() => setOpen(true)}>
        <div className="value">
          {commentValue?.length > 0 ? commentValue : "-"}
        </div>
        <div className="label">Коментар</div>
      </StyledComment>
    </div>
  );
};

const StyledComment = styled.div`
  width: 100%;
  padding: 7px 30px 6px;
  border-radius: 6px;
  background: var(--card-bg-3)444;
  .value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Overpass, sans-serif;
    font-size: 14px;
    font-weight: 200;
    line-height: 17px;
    letter-spacing: 0.02em;
    text-align: left;
    var(--main-color)fff;
    margin-bottom: 2px;
    max-width: 200px;
    overflow: hidden;
    @media (min-width: 1200px) {
      max-width: 300px;
    }
    @media (min-width: 1400px) {
      max-width: 500px;
    }
  }
  .label {
    font-family: Open Sans, sans-serif;
    font-size: 11px;
    font-weight: 200;
    line-height: 15px;
    letter-spacing: 0.02em;
    text-align: left;
    var(--main-color)fff;
    opacity: 0.4;
  }
`;
