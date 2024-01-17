import { styled } from "styled-components";
import { Text } from "./Text";
import { Price } from "./Price";
import { Header } from "./Header";
import { Buttons } from "./Buttons/Buttons";

export const Card = ({
  title,
  price,
  color,
  open,
  onOpen,
  selected,
  onSelect,
  onPay,
  paying,
  dayCount,
  loading,
}) => {
  return (
    <StyledCard open={open} paying={selected && paying}>
      <Header
        price={price}
        color={color}
        open={open}
        paying={selected && paying}
      />
      <div
        className="footer flex items-center justify-between"
        onClick={() => (open ? null : onOpen())}
      >
        <Text title={title} paying={selected && paying} dayCount={dayCount} />
        {selected && paying ? null : loading ? null : open ? (
          <Buttons
            selected={selected}
            onSelect={onSelect}
            onPay={onPay}
            loading
          />
        ) : (
          <Price price={price} color={color} />
        )}
      </div>
    </StyledCard>
  );
};
const StyledCard = styled.div`
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 14px 11px;
  cursor: pointer;
  border: 1.4px solid rgba(255, 255, 255, 0.1)
    ${({ open }) => open && "border: 1.4px solid #D9D9D9;"};
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: ${({ paying }) => (paying ? "0%" : "100%")};
    width: 992px;
    height: 992px;
    flex-shrink: 0;
    border-radius: 992px;
    opacity: 0.1;
    background: #2fa112;
    transform: translateY(-50%);
    transition: all 0.8s;
    z-index: 0;
  }
  ${({ paying }) => paying && "border: 1.4px solid #248E09"}
`;
