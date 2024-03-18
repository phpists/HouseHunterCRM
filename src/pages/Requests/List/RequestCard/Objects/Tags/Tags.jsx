import styled from "styled-components";
import { Tag } from "./Tag";

export const Tags = ({ data }) => {
  const likes = data?.General_field_group?.countLike ?? 0;
  const dislikes = data?.General_field_group?.countDislike ?? 0;

  return (
    <StyledTags className="flex items-center">
      <Tag
        count={likes}
        type={dislikes > 0 ? "green" : undefined}
        className="like-tag"
      />
      <Tag count={dislikes} type={dislikes > 0 ? "red" : undefined} />
      <Tag
        count={data?.General_field_group?.count_objects ?? 0}
        title="нових"
        className="newTag"
        type="blue"
      />
    </StyledTags>
  );
};

const StyledTags = styled.div`
  gap: 6px;
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
