import { styled } from "styled-components";
import { Notification } from "./Notification";
import { Status } from "../../Status";
import { Info } from "./Info";
import { Avatar } from "./Avatar";
import { EditProfile } from "./EditProfile/EditProfile";
import { useState } from "react";

export const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      {openEdit && <EditProfile onClose={() => setOpenEdit(false)} />}
      <StyledProfile
        className="flex items-center"
        onClick={() => setOpenEdit(true)}
      >
        <Notification />
        <div className="flex items-start">
          <Status status={1} />
          <Info />
        </div>
        <Avatar />
      </StyledProfile>
    </>
  );
};

const StyledProfile = styled.div`
  padding: 3px 3px 3px 14px;
  border-radius: 6px;
  cursor: pointer;
  background: #2c2c2c;
  background: linear-gradient(to right, #2c2c2c 50%, #474747 50%) left;
  background-size: 200%;
  transition: 0.3s ease-out;
  &:hover {
    background-position: right;
  }
`;
