import styled from "styled-components";

export const AutoriaComment = ({ comment }) => {
  if (comment?.length === 0) {
    return null;
  }
  return (
    <StyledAutoriaComment>
      <div
        className="value"
        dangerouslySetInnerHTML={{
          __html: comment,
        }}
      ></div>
      <div className="label">Коментар Авторіа</div>
    </StyledAutoriaComment>
  );
};

const StyledAutoriaComment = styled.div`
  padding: 8px 11px 9px;
  font-size: 12px;
  .value {
    color: var(--main-color);
    font-family: Overpass;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%;
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    position: relative;
    transition: all 0.3s;
    width: 90%;
    word-break: break-all;
  }
  .label {
    color: var(--subtitle-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    margin-top: 2px;
    text-transform: capitalize;
  }
`;
