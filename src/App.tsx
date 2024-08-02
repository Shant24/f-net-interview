import { useState } from "react";
import type { IOption } from "@/types";
import CustomSelect from "@/components/CustomSelect";
import names from "./names.json";

const App = () => {
  const [singleValue, setSingleValue] = useState<IOption | null>(null);
  const [multipleValues, setMultipleValues] = useState<IOption[] | null>([]);

  return (
    <>
      <div style={{ position: "relative", padding: 100, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <CustomSelect
          value={singleValue}
          options={names}
          label="Region"
          // errorMessage="Region is required"
          handleValueChange={setSingleValue}
        />

        <CustomSelect
          isMulti
          value={multipleValues}
          options={names}
          label="Subject"
          errorMessage="Subject is required"
          handleValueChange={setMultipleValues}
        />
      </div>
    </>
  );
};

export default App;
