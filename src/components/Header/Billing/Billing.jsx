import { styled } from "styled-components";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { BillButton } from "./BillButton";
import { useEffect, useState } from "react";
import { Paying } from "./Paying/Paying";
import { Download } from "./Download/Download";
import { Divider } from "./Divider";
import { useViewCompanyBalanceQuery } from "../../../store/billing/billing.api";
import { useActions } from "../../../hooks/actions";
import { useAppSelect } from "../../../hooks/redux";
import { Tag } from "./Tag";

export const Billing = ({ open, onToggleOpen, onToggleHover }) => {
  const { data: balanceData, refetch } = useViewCompanyBalanceQuery();
  const [attach, setAttach] = useState(false);
  const [download, setDownload] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [value, setValue] = useState(0.0);
  const { saveBalance } = useActions();
  const { balance } = useAppSelect((state) => state.billing);

  const handleToggleAttach = (value) => {
    setAttach(value);
    setDownload(false);
  };

  const handleClose = () => {
    onToggleOpen(false);
    setValue(0);
    setAttach(false);
  };

  useEffect(() => {
    saveBalance(balanceData?.total?.toFixed(2));
  }, [balanceData]);

  return (
    <StyledBilling
      className="flex items-center"
      open={open}
      attach={attach.toString()}
      onMouseEnter={() => onToggleHover(true)}
      onMouseLeave={() => onToggleHover(false)}
      onTouchStart={() => onToggleHover(true)}
      onTouchEnd={() => onToggleHover(false)}
    >
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
          value={value}
          refetchBalance={refetch}
          onClose={handleClose}
        />
      )}
      <div className="main-text">
        <div className="flex  mb-0.5">
          <Title
            open={open}
            balance={balance ?? "0.00"}
            value={value}
            onChange={(val) => setValue(val)}
          />
          {!open && Number(balanceData?.sale) > 0 && (
            <Tag procent={balanceData?.sale} />
          )}
        </div>
        <Subtitle subtitle={open ? "Сума поповнення" : null} />
      </div>
      {/* {open ? (
        <Paying
          onClose={handleClose}
          attach={attach}
          onChangeAttach={handleToggleAttach}
          downloading={downloading}
          value={value}
          refetchBalance={refetch}
        />
      ) : (
        <BillButton onClick={() => onToggleOpen(true)} />
      )} */}
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
    /* padding: 12px 187px 11px 13px;*/
    /* border-radius: 12px;
    background: var(--second-bg);
    border: none;
    & > .bill-btn {
      opacity: 1;
    }
    .divider {
      opacity: 0;
    } */
  }

  ${({ open }) =>
    open &&
    `
    // padding: 11px 165px 11px 14px !important;
    border-radius: 12px;
    background: var(--second-bg);
    border: none;
    .main-text {
        margin: 0 10px 0 0;
    }
    .divider {
      opacity: 0;
    }
  `}
  ${({ attach }) =>
    attach === "true" &&
    `
    // padding: 4px 20px 4px 4px !important;
    .main-text {
        margin: 0 0 0 0;
    }
  `}

@media (max-width: 1200px) {
    &:hover {
      /* padding: 12px 160px 11px 13px; */
    }
  }

  @media (max-width: 600px) {
    padding: 0 10px;
    /* padding: 0 20px 0 12px; */
    &:hover {
      /* padding: 14px 130px 11px 13px; */
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
    // padding: 4px 20px 4px 4px !important;
  `}
  }
`;
