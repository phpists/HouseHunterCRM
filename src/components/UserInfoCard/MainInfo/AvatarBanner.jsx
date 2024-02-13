import styled from "styled-components";
import addPhoto from "../../../assets/images/reload.svg";
import avatarBg from "../../../assets/images/avatar-bg-card.png";
import { useEffect, useState } from "react";
import {
  useGetBannersQuery,
  useLazyUpdateBannerIdQuery,
} from "../../../store/auth/auth.api";
import { useAppSelect } from "../../../hooks/redux";
import { useActions } from "../../../hooks/actions";

export const AvatarBanner = ({ value, onChange }) => {
  const { user } = useAppSelect((state) => state.auth);
  const { loginUser } = useActions();
  const { data } = useGetBannersQuery();
  const [updateBanner] = useLazyUpdateBannerIdQuery();

  const toggleBackground = () => {
    const currentValue = isNaN(value) ? 1 : Number(value);
    const nextValue = currentValue + 1;
    const updatedValue =
      nextValue > Object.entries(data.data)?.length ? 1 : nextValue;
    onChange(updatedValue);
    updateBanner(updatedValue);
    loginUser({ ...user, id_baner: updatedValue });
  };

  return (
    <StyledAvatarBanner
      className="flex items-center justify-center"
      avatarBg={data?.data[value]?.url ?? data?.data[1]?.url}
      onClick={toggleBackground}
    >
      <img src={addPhoto} alt="" />
    </StyledAvatarBanner>
  );
};

const StyledAvatarBanner = styled.div`
  height: 40px;
  border-radius: 10px 10px 0px 0px;
  margin-bottom: 6px;
  background: url(${({ avatarBg }) => avatarBg}) center/cover no-repeat;
  margin: -6px -6px 6px;
  position: relative;
  cursor: pointer;
  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
  img {
    opacity: 0;
    width: 24px;
    height: 24px;
    transition: all 0.3s;
  }
  &:hover {
    img {
      opacity: 1;
    }
  }
`;
