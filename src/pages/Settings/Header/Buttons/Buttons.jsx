import { IconButton } from "../../../../components/IconButton";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";
import { Search } from "./Search";
import { styled } from "styled-components";
import { handleCheckAccess } from "../../../../utilits";
import { useAppSelect } from "../../../../hooks/redux";

export const Buttons = ({
  filter,
  onChangeFilter,
  onApplyFilters,
  onCreate,
}) => {
  const { accessData: data, user } = useAppSelect((state) => state.auth);

  return (
    <StyledButtons className="flex items-center">
      <Search
        filter={filter}
        onChangeFilter={onChangeFilter}
        onApplyFilters={onApplyFilters}
      />
      <IconButton Icon={PlusIcon} className="icon-btn" onClick={onCreate} />
    </StyledButtons>
  );
};

const StyledButtons = styled.div`
  .icon-btn {
    border: 2px solid var(--bg-20) !important;
    margin-left: 15px;
    &:hover {
      border: 2px solid transparent !important;
    }
  }

  @media (max-width: 850px) {
    .select-wrapper-desktop {
      display: none;
    }
    .icon-btn--last {
      /* margin: 0; */
    }
  }
`;
