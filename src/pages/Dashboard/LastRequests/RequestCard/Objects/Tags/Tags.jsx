import styled from "styled-components";
import { Tag } from "./Tag";

export const Tags = ({ data }) => {
  const likes = data?.countLike ?? 0;
  const dislikes = data?.countDislike ?? 0;

  return (
    <StyledTags className="flex items-center">
      <Tag
        count={likes}
        type={likes > 0 ? "green" : undefined}
        className="like-tag"
      />
      <Tag count={dislikes} type={dislikes > 0 ? "red" : undefined} />
    </StyledTags>
  );
};

const StyledTags = styled.div`
  gap: 6px;
  margin-bottom: 6px;
  .newTag {
    padding: 1px 6px 2px;
    margin-left: 8px;
  }
  .like-tag {
    svg {
      transform: rotate(0deg);
    }
  }
`;
