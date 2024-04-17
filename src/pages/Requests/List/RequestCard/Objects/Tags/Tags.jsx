import styled from "styled-components";
import { Tag } from "./Tag";
import { useLazyRecountNewobjectRequestQuery } from "../../../../../../store/requests/requests.api";
import { useState } from "react";

export const Tags = ({ data, onChangeNewCount }) => {
  const likes = data?.General_field_group?.countLike ?? 0;
  const dislikes = data?.General_field_group?.countDislike ?? 0;
  const [recoutNewObjects] = useLazyRecountNewobjectRequestQuery();
  const [loading, setLoading] = useState(false);

  const handleRecountNewObjects = () => {
    setLoading(true);
    recoutNewObjects(data?.id_group).then((resp) => {
      const newCount = resp?.data?.count;
      setLoading(false);

      if (newCount) {
        onChangeNewCount(newCount);
      }
    });
  };

  return (
    <StyledTags className="flex items-center clickable">
      <Tag
        count={likes}
        type={likes > 0 ? "green" : undefined}
        className="like-tag"
      />
      <Tag count={dislikes} type={dislikes > 0 ? "red" : undefined} />
      <Tag
        count={data?.General_field_group?.count_objects ?? 0}
        title="нових"
        className="newTag"
        type="blue"
        onClick={handleRecountNewObjects}
        loading={loading}
      />
    </StyledTags>
  );
};

const StyledTags = styled.div`
  gap: 6px;
  .newTag {
    margin-left: 8px;
  }
  .like-tag {
    svg {
      transform: rotate(0deg);
    }
  }
`;
