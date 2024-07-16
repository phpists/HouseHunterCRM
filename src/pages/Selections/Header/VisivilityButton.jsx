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
      <IconButton Icon={NoAIcon} active={active} className="icon-btn" />
    </StyledVisivilityButton>
  );
};

const StyledVisivilityButton = styled.button`
  margin-right: 15px;
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid var(--bg-20) !important;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    g {
      opacity: 0.4 !important;
    }
    &:hover {
      background: var(--bg-20);
      g {
        opacity: 1 !important;
      }
    }
    &:active {
      border: 1.2px solid #fff;
      g {
        opacity: 1 !important;
      }
    }
  }
`;
