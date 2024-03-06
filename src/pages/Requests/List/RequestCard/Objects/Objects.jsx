import styled from "styled-components";
import { SeenTime } from "./SeenTime";
import { Photos } from "./Photos/Photos";
import { Title } from "./Title";
import { Tag } from "./Tag";
import { OpenButton } from "./OpenButton";
import { Buttons } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { Name } from "./Name";

export const Objects = ({ idGroup, onOpenChat, data }) => {
  const navigate = useNavigate();

  return (
    <StyledObjects className="clickable">
      <SeenTime date={data?.General_field_group?.dt_view_client} />
      <div className="flex items-center clickable">
        {/* <Photos /> */}
        <div className="clickable objects-info-wrapper">
          <Name name={data?.General_field_group?.name ?? "-"} />
          <div className="flex items-center clickable object-counts">
            <Title count={data?.General_field_group?.count_objects} />
            <Tag count={data?.General_field_group?.count_objects} />
          </div>
          <div className="flex items-center">
            <OpenButton onClick={() => navigate(`/selections/${idGroup}`)} />
            <Buttons onOpenChat={onOpenChat} idGroup={idGroup} />
          </div>
        </div>
      </div>
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  padding: 10px;
  border-radius: 9px;
  background: #363636;
  /* opacity: 0.2; */
  min-width: 190px;
  .object-counts {
    margin-bottom: 12px;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (min-width: 1400px) {
    min-width: 220px;
  }
  .objects-info-wrapper {
    width: 100%;
  }
`;
