import { useState } from "react";
import { Field } from "../../../../../../components/Field";
import { AddButton } from "./AddButton";
import { AdditionalPhone } from "./AdditionalPhone";

export const Phones = () => {
  const [count, setCount] = useState([]);

  return (
    <div>
      <Field value="+38 (097) 707-62-58" label="Телефон" />
      {count.map((e, i) => (
        <>
          <div className="divider" />
          <AdditionalPhone
            key={i}
            onRemove={() => setCount(count.filter((e, j) => i !== j))}
          />
        </>
      ))}
      <div className="divider" />
      <AddButton onClick={() => setCount([...count, 1])} />
    </div>
  );
};
