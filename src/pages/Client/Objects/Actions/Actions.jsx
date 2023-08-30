import { styled } from "styled-components";
import megaphoneIcon from "../../../../assets/images/megafon-object.svg";
import homeIcon from "../../../../assets/images/home-gradient.svg";
import { Action } from "./Action";
import { useState } from "react";

export const Actions = () => {
  const [active, setActive] = useState(null);

  const handleChangeActive = (value) => setActive(value);

  return (
    <StyledActions className="flex items-center">
      <Action
        icon={megaphoneIcon}
        title="Додати новий запит"
        color="#2DF47D"
        background="rgba(45, 244, 125, 0.10)"
        className="mr-2.5"
        onChangeHover={handleChangeActive}
        active={active}
        index={1}
      />
      <Action
        icon={homeIcon}
        title="Додати новий об’єкт"
        color="#9747FF"
        background="rgba(151, 71, 255, 0.10)"
        onChangeHover={handleChangeActive}
        active={active}
        index={2}
      />
    </StyledActions>
  );
};

const StyledActions = styled.div`
  margin-bottom: 10px;
`;
