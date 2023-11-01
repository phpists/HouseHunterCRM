import styled from "styled-components";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { OpenIcon } from "./OpenIcon";
import { useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";
import { useEffect } from "react";
import { useLazyEditPerimissionQuery } from "../../../../../../../store/structure/structure.api";
import { handleResponse } from "../../../../../../../utilits";
import cogoToast from "cogo-toast";

export const RoleCard = ({
  IconImg,
  iconBg,
  iconColor,
  title,
  subtitle,
  noOpen,
  permissionsList,
  initValues,
  id,
  onRefetchData,
}) => {
  const [editPermission] = useLazyEditPerimissionQuery();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState([]);

  const handleSetInitialValues = () =>
    setValues(initValues ? Object.entries(initValues).map((v) => v[1]) : []);

  useEffect(() => {
    handleSetInitialValues();
  }, [initValues]);

  const handleChangeValue = (index, field, value) =>
    setValues(
      values?.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );

  const handleSave = () => {
    editPermission({
      permission_list_json: JSON.stringify(values),
      permission_my_structure_list_json: JSON.stringify(values),
      module_name: title,
      id_permissions: id,
    }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Зміни успішно збережені", {
          hideAfter: 3,
          position: "top-right",
        });
        onRefetchData();
      })
    );
  };

  return (
    <div>
      <StyledRoleCard
        iconColor={iconColor}
        className="flex items-center"
        open={open}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Icon IconImg={IconImg} iconBg={iconBg} iconColor={iconColor} />
            <Text title={title} subtitle={subtitle} />
          </div>
          {!noOpen && <OpenIcon onClick={() => setOpen(!open)} open={open} />}
        </div>
      </StyledRoleCard>
      {open && (
        <Dropdown
          iconColor={iconColor}
          permissionsList={permissionsList}
          values={values}
          onChangeValue={handleChangeValue}
          onResetValues={handleSetInitialValues}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export const StyledRoleCard = styled.div`
  padding: 8px 10px;
  border-radius: ${({ open }) => (open ? "6px 6px 0 0" : "6px")};
  border: 1px solid ${({ iconColor }) => iconColor};
  background: rgba(255, 255, 255, 0.1);
`;
