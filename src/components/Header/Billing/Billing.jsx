import { styled } from "styled-components";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { BillButton } from "./BillButton";
import { useState } from "react";
import { Paying } from "./Paying/Paying";
import { Download } from "./Download/Download";
import { Divider } from "./Divider";

export const Billing = () => {
  const [open, setOpen] = useState(false);
  const [attach, setAttach] = useState(false);
  const [download, setDownload] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleToggleAttach = (value) => {
    setAttach(value);
    setDownload(false);
  };

  return (
    <StyledBilling className="flex items-center" open={open} attach={attach}>
      {attach && (
        <Download
          download={download}
          onLoaded={() => {
            setDownloading(false);
          }}
          downloading={downloading}
          onDownloading={() => {
            setDownloading(true);
            setDownload(true);
          }}
        />
      )}
      <div className="main-text">
        <Title open={open} />
        <Subtitle subtitle={open ? "Сума поповнення" : null} />
      </div>
      {open ? (
        <Paying
          onClose={() => setOpen(false)}
          attach={attach}
          onChangeAttach={handleToggleAttach}
          downloading={downloading}
        />
      ) : (
        <BillButton onClick={() => setOpen(true)} />
      )}
      <Divider />
    </StyledBilling>
  );
};

const StyledBilling = styled.div`
  padding: 12px 60px 11px 8px;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
  &:hover {
    padding: 12px 187px 11px 13px;
    border-radius: 12px;
    background: #474747;
    border: none;
    & > .bill-btn {
      opacity: 1;
    }
    .divider {
      opacity: 0;
    }
  }

  ${({ open }) =>
    open &&
    `
    padding: 11px 245px 11px 14px !important;
    border-radius: 12px;
    background: #474747;
    border: none;
    .main-text {
        margin: 0 123px 0 0;
    }
    .divider {
      opacity: 0;
    }
  `}
  ${({ attach }) =>
    attach &&
    `
    padding: 4px 90px 4px 4px !important;
    .main-text {
        margin: 0 0 0 0;
    }
  `}

@media (max-width: 1200px) {
    &:hover {
      padding: 12px 160px 11px 13px;
    }
  }

  @media (max-width: 600px) {
    &:hover {
      padding: 14px 130px 11px 13px;
      background: none;
    }
    ${({ open }) =>
      open &&
      `
      height: 58px;
      background: none;
        .main-text {
            display: none;
        }
  `}
    ${({ attach }) =>
      attach &&
      `
    padding: 4px 54px 4px 4px !important;
  `}
  }
`;
