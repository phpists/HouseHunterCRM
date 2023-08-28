import { CancelButton } from "./CancelButton";
import { PayButton } from "./PayButton";
import { SelectButton } from "./SelectButton";

export const Buttons = ({ selected, onSelect, onPay }) => (
  <div className="flex items-center">
    {selected ? (
      <>
        <CancelButton onCancel={onSelect} />
        <PayButton onPay={onPay} />
      </>
    ) : (
      <SelectButton onSelect={() => onSelect()} />
    )}
  </div>
);
