import { styled } from "styled-components";
import megaphoneIcon from "../../../../assets/images/megafon-object.svg";
import homeIcon from "../../../../assets/images/home-gradient.svg";
import { Action } from "./Action";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { handleCheckAccess } from "../../../../utilits";

export const Actions = ({ accessData }) => {
  const { id } = useParams();
  const [active, setActive] = useState(null);

  const handleChangeActive = (value) => setActive(value);

  return (
    <StyledActions className="flex items-center">
      {handleCheckAccess(accessData, "requests", "add") && (
        <Action
          icon={megaphoneIcon}
          title="Додати новий запит"
          color="#2DF47D"
          background="rgba(45, 244, 125, 0.10)"
          className="mr-2.5"
          onChangeHover={handleChangeActive}
          //   active={!handleCheckAccess(accessData, "objects", "add") ? 1 : active}
          index={1}
          link={`/create-request/${id}`}
        />
      )}
      {handleCheckAccess(accessData, "objects", "add") && (
        <Action
          icon={homeIcon}
          title="Додати новий автомобіль"
          color="#9747FF"
          background="rgba(151, 71, 255, 0.10)"
          onChangeHover={handleChangeActive}
          //   active={
          //     !handleCheckAccess(accessData, "requests", "add") ? 2 : active
          //   }
          index={2}
          link={`/create-object/${id}`}
        />
      )}
    </StyledActions>
  );
};

const StyledActions = styled.div`
  margin-bottom: 10px;
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 10px;
  }
`;
