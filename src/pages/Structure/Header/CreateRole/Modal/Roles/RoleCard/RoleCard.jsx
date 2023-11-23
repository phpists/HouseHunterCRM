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
  idPermision,
  onRefetchData,
  level,
}) => {
  const [editPermission] = useLazyEditPerimissionQuery();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState([]);

  const handleSetInitialValues = () => {
    if (
      typeof initValues === "object" &&
      Object.entries(initValues)?.length > 0
    ) {
      setValues(Object.entries(initValues)?.map((p) => p[1]));
    } else {
      setValues(
        Object.entries(permissionsList).map((p) => ({
          id_module: p[0],
          view: false,
          add: false,
          edit: false,
          delete: false,
        }))
      );
    }
  };

  useEffect(() => {
    permissionsList && handleSetInitialValues();
  }, [initValues]);

  const handleChangeValue = (index, field, value) =>
    setValues(
      values?.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );

  const handleSave = () => {
    editPermission({
      module_name: title,
      id_permissions: idPermision,
      structure_level: level,
      permission_list_json: JSON.stringify(values),
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
