import styled from "styled-components";
import like from "../../../assets/images/like.svg";
import dislike from "../../../assets/images/dislike.svg";

export const Status = ({ data }) => {
  return (
    <StyledStatus
      className="flex items-center justify-center"
      like={data?.like}
    >
      <img src={data?.like ? like : dislike} alt="" />
    </StyledStatus>
  );
};

const StyledStatus = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  background: ${({ like }) => (like ? "#5A9E49" : "#D15B5B")};
  z-index: 10;
`;
