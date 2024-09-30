import styled from "styled-components";
import { ReactComponent as OfficeIcon } from "../assets/images/office.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/images/delete-access.svg";
import { useLazyDeleteCompanyImgQuery } from "../store/billing/billing.api";
import { handleResponse, showAlert } from "../utilits";

export const CompanyLogo = ({ value, onEdit, onRefreshData }) => {
  const navigate = useNavigate();
  const [deleteImg] = useLazyDeleteCompanyImgQuery();

  const handleDelete = () => {
    deleteImg().then((resp) =>
      handleResponse(resp, () => {
        onRefreshData();
        showAlert("success", "Зображення успішно видалено");
      })
    );
  };
  return (
    <StyledCompanyLogo
      className="flex justify-center items-center cursor-pointer"
      value={value}
      onClick={() => (onEdit ? null : navigate("/company"))}
    >
      {value && onEdit ? (
        <button className="delete" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      ) : value ? null : (
        <OfficeIcon />
      )}
      {onEdit ? (
        <input
          type="file"
          value=""
          onChange={(e) => onEdit(e.target.files[0])}
        />
      ) : null}
    </StyledCompanyLogo>
  );
};

const StyledCompanyLogo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  background: url(${({ value }) => value}) center/cover no-repeat,
    var(--card-bg-4);
  transition: all 0.3s;
  border: 1px solid transparent;
  position: relative;
  margin-top: 20px;
  input {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    z-index: 10;
  }
  g {
    transition: all 0.3s;
  }
  .delete {
    padding: 10px;
    opacity: 0;
    transition: all 0.3s;
    z-index: 12;
  }
  &:hover {
    border: 1px solid #fff;
    g {
      opacity: 1;
    }
    .delete {
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
