import styled from "styled-components";
import { Name } from "./Name";
import { Phone } from "./Phone/Phones";
import { useState } from "react";
import { CommentButton } from "./CommentButton";
import { ProfileField } from "../../../ProfileField";

export const Contact = ({ type, phones, name, typeText }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  return (
    <StyledContact className="clickable">
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
      <Phone commentOpen={commentOpen} phones={phones} />
    </StyledContact>
  );
};

const StyledContact = styled.div`
  .comment-wrapper {
    margin: 10px 0 4px;
  }
  .comment-value-wrapper {
    width: 200px;
  }
`;
