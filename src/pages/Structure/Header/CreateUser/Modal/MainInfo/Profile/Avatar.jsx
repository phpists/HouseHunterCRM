import styled from "styled-components";
import img from "../../../../../../../assets/images/small-avatar-green.svg";
import addAvatar from "../../../../../../../assets/images/add-avatar.svg";

export const Avatar = ({ photo, onChange }) => (
  <StyledAvatar avatar={photo?.length > 0 ? photo : img}>
    <img src={addAvatar} alt="" />
    <input
      type="file"
      name=""
      id=""
      accept="image/png, image/jpg, image/jpeg"
      value=""
      onChange={(e) => onChange(e.target.files[0])}
    />
  </StyledAvatar>
);

const StyledAvatar = styled.div`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 100%;
  position: relative;
  background: url(${({ avatar }) => avatar}) center/cover no-repeat;
  margin-right: 16px;
  img {
    position: absolute;
    bottom: 0;
    right: -5px;
    cursor: pointer;
  }
  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
`;
