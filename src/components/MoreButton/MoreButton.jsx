import { styled } from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { Divider } from "./Divider";
import { useState } from "react";

export const MoreButton = ({
  className,
  onDelete = () => null,
  onFavorite = () => null,
  favorite,
  editLink,
  noFavorite,
  noDelete,
  onSend,
}) => {
  const [isFocusedBtn, setIsFocusedBtn] = useState(false);

  return (
    <StyledMoreButton
      className={`flex items-center more noClickable ${className}`}
      isFocusedBtn={isFocusedBtn}
    >
      <div className="btn-wrapper relative noClickable">
        <Button onChangeFocus={(val) => setIsFocusedBtn(val)} />
        <Dropdown
          onDelete={onDelete}
          onFavorite={onFavorite}
          favorite={favorite}
          editLink={editLink}
          noFavorite={noFavorite}
          noDelete={noDelete}
          onSend={onSend}
        />
      </div>
      <Divider />
    </StyledMoreButton>
  );
};

const StyledMoreButton = styled.button`
  position: relative;
  transition: all 0.3s;
  opacity: 0;
  transform: translateX(-10px);
  ${({ isFocusedBtn }) =>
    isFocusedBtn &&
    `
   .dropdown {
      opacity: 1;
      visibility: visible;
    }
`}

  &:focus {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
`;
