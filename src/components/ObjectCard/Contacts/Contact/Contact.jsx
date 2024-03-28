import styled from "styled-components";
import { Name } from "./Name";
import { Phone } from "./Phone/Phones";
import { useState } from "react";
import { CommentButton } from "./CommentButton";
import { ProfileField } from "../../../ProfileField";

export const Contact = ({
  type,
  phones,
  name,
  typeText,
  error,
  onShow,
  className,
}) => {
  const [commentOpen, setCommentOpen] = useState(false);

  return (
    <StyledContact className={`${className} clickable`}>
      <div className="flex items-center clickable">
        {/* <CommentButton
          active={commentOpen}
          onClick={() => setCommentOpen(!commentOpen)}
        /> */}
        <Name type={type} name={name} typeText={typeText} />
      </div>
      {commentOpen && (
        <div className="comment-wrapper">
          <ProfileField
            value="В квартирі є вся необхідна техніка та меблі, гарна, затишна. Розглядають всіх порядних орендарів, без дітей та домашніх улюбленців. В квартирі є вся необхідна техніка та меблі, гарна, затишна. Розглядають всіх порядних орендарів, без дітей та домашніх улюбленців."
            label="Коментар"
            textarea
            contentHeight
            className="comment-value-wrapper"
          />
        </div>
      )}
      <Phone
        commentOpen={commentOpen}
        phones={phones}
        error={error}
        onShow={onShow}
      />
    </StyledContact>
  );
};

const StyledContact = styled.div`
  .comment-wrapper {
    margin: 10px 0 0px;
  }
  .comment-value-wrapper {
    width: 150px;
  }
`;
