import { useState } from "react";
import { Divider } from "../Divider";
import { Contact } from "./Contact/Contact";

export const Contacts = () => {
  const [phones, setPhones] = useState([]);

  return (
    <div>
      <Contact isFirst onAdd={() => setPhones([...phones, 1])} />
      {phones.map((phone, i) => (
        <>
          <Divider />
          <Contact
            onRemove={() => setPhones(phones.filter((p, j) => i !== j))}
          />
        </>
      ))}
    </div>
  );
};
