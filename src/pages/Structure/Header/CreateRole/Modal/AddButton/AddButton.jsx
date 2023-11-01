import { useState } from "react";
import { Button } from "./Button";
import { Creating } from "./Creating/Creating";

export const AddButton = ({ onRefetchData }) => {
  const [creating, setCreating] = useState(false);

  return (
    <>
      {creating ? (
        <Creating
          onClose={() => setCreating(false)}
          onRefetchData={onRefetchData}
        />
      ) : (
        <Button onClick={() => setCreating(true)} />
      )}
    </>
  );
};
