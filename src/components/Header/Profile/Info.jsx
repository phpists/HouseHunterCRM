import { styled } from "styled-components";
import { useAppSelect } from "../../../hooks/redux";

export const Info = () => {
  const { user } = useAppSelect((state) => state.auth);

  return (
    <StyledInfo className="clickable">
      <h4 className="name clickable">
        {user?.first_name ?? ""} {user?.last_name ?? ""}
      </h4>
      <div className="email clickable">{user?.email ?? ""}</div>
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  text-align: right;
  color: var(--main-color);
  margin-right: 15px;
  .name {
    font-family: Overpass;
    font-size: 15px;
    font-weight: var(--font-weight-100);
    line-height: 118%;
    letter-spacing: 0.3px;
    margin-bottom: 2px;
    width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .email {
    text-align: right;
    font-family: Open Sans;
    font-size: 11px;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  @media (max-width: 1200px) {
    display: none;
  }
`;
