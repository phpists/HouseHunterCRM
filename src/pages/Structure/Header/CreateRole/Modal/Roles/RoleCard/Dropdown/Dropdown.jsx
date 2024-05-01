import React from "react";
import styled from "styled-components";
import { Footer } from "./Footer";
import { Divider } from "./Divider";
import { AccessBlock } from "./AccessBlock/AccessBlock";

export const Dropdown = ({
  iconColor,
  permissionsList,
  values,
  onChangeValue,
  onResetValues,
  onSave,
}) => {
  return (
    <StyledDropdown iconColor={iconColor}>
      {permissionsList && Object.entries(permissionsList)?.length > 0
        ? Object.entries(permissionsList)?.map((p, i) => (
            <React.Fragment key={i}>
              <AccessBlock
                title={p[1]?.name}
                value={values?.find((v) => v.id_module === p[1]?.id)}
                onChange={(fieldName, value) =>
                  onChangeValue(i, fieldName, value)
                }
              />
              <Divider />
            </React.Fragment>
          ))
        : null}
      <Footer onReset={onResetValues} onSave={onSave} />
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  padding: 20px 10px;
  border-radius: 0 0 6px 6px;
  background: var(--bg-4);
  border: 1px solid ${({ iconColor }) => iconColor};
  border-top: none;
`;
