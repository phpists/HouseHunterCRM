import styled from "styled-components";
import { Photo } from "./Photo";
import photo from "../../../../../assets/images/object.png";
import { Info } from "./Info/Info";

export const Object = ({ publicateDate, status, img, title, rubricId }) => (
  <StyledObject>
    <Photo photo={img} />
    <Info
      publicateDate={publicateDate}
      status={status}
      title={title}
      rubricId={rubricId}
    />
  </StyledObject>
);

const StyledObject = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
