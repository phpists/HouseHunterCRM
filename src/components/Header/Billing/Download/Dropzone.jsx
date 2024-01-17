import { styled } from "styled-components";

export const Dropzone = ({ onDownload }) => (
  <StyledDropzone>
    Перетягніть або завантажте будь-який <br />
    файл розміром не більше 30 МБ
    <input type="file" onChange={(e) => onDownload(e.target.files[0])} />
  </StyledDropzone>
);

const StyledDropzone = styled.div`
  padding: 9px 21px 11px 22px;
  border-radius: 9px;
  border: 1px dashed #5d63ff;
  background: rgba(49, 50, 65, 0);
  color: rgba(255, 255, 255, 0.2);
  text-align: center;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  transition: all 0.3s;
  position: relative;
  &:hover {
    background: #313241;
    color: #5d63ff;
  }

  input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
  }

  @media (max-width: 600px) {
    font-size: 8px;
    padding: 8px 21px;
  }
`;
