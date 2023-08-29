import { ApplePay } from "./ApplePay";
import { Button } from "./Button";
import { GooglePay } from "./GogglePay";
import { ReactComponent as AttachIcon } from "../../../../assets/images/attach.svg";
import { ReactComponent as TimeIcon } from "../../../../assets/images/time.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/images/close.svg";
import { Divider } from "./Divider";
import { styled } from "styled-components";
import { Info } from "./Info";

export const Paying = ({ onClose, attach, onChangeAttach, downloading }) => {
  return (
    <StyledPaying className="flex items-center">
      {!attach && (
        <>
          <GooglePay />
          <ApplePay />
          <Button
            Icon={AttachIcon}
            hoverColor="#5D63FF"
            className="mr-2.5"
            onClick={() => onChangeAttach(true)}
          />
          <Info />
          <Button Icon={TimeIcon} hoverColor="#5D63FF" />
          <Divider />
        </>
      )}
      <Button
        Icon={CloseIcon}
        hoverColor="#FC3E3E"
        onClick={() =>
          downloading ? null : attach ? onChangeAttach(false) : onClose()
        }
        disabled={downloading}
      />
    </StyledPaying>
  );
};

const StyledPaying = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;
