import { styled } from "styled-components";
import objectPhoto from "../../../../../../assets/images/object.png";

export const Photo = () => <StyledPhoto photo={objectPhoto} />;

const StyledPhoto = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 6px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  margin-right: 8px;
`;
