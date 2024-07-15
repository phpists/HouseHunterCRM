import styled from "styled-components";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as NoAIcon } from "../../../assets/images/no-a.svg";
import { useLazyChangeHideTitleQuery } from "../../../store/selections/selections.api";
import { useParams } from "react-router-dom";
import { handleResponse } from "../../../utilits";
import { useState } from "react";

export const VisivilityButton = ({ active, onChange }) => {
  const { id } = useParams();
  const [changeHideTitle] = useLazyChangeHideTitleQuery();
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    if (!loading) {
      setLoading(true);
      changeHideTitle(id).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          onChange(!active);
        });
      });
    }
  };

  return (
    <StyledVisivilityButton onClick={handleToggle}>
      <IconButton Icon={NoAIcon} active={active} />
    </StyledVisivilityButton>
  );
};

const StyledVisivilityButton = styled.button`
  margin-right: 15px;
`;
