import { styled } from "styled-components";
import { Status } from "../../../../../components/Status";
import { Avatar } from "./Avatar";
import { useAppSelect } from "../../../../../hooks/redux";

export const Owner = ({ data }) => {
  const { user } = useAppSelect((state) => state.auth);

  return (
    <StyledOwner className="flex items-center">
      {/* <Status status={1} className="status-badge" /> */}
      <div
        className="name"
        title={`${user?.first_name ?? "-"} ${user?.last_name ?? "-"}`}
      >
        {user?.first_name ?? "-"} {user?.last_name ?? "-"}
      </div>
      <Avatar photo={user?.photo} />
    </StyledOwner>
  );
};

const StyledOwner = styled.div`
  padding: 3px 3px 3px 6px;
  border-radius: 17px;
  background: var(--dark-card-bg);
  .name {
    margin: 0 7px 0 9px;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
  }
  .status-badge {
    border-radius: 20px;
    margin: 0;
  }
  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;
