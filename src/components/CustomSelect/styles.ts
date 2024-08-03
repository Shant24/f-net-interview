import type { GroupBase, StylesConfig } from "react-select";

export const customSelectStyles: StylesConfig<unknown, false, GroupBase<unknown>> = {
  container: (provided) => ({
    ...provided,
    boxShadow: "0px 2px 24px 0px val(--color-black-8)",
    border: "1px solid var(--color-dark-50)",
    backgroundColor: "var(--color-white)",
    borderRadius: 10,
    overflow: "hidden",
  }),
  control: (_provided) => ({
    ..._provided,
    minHeight: 40,
    position: "relative",
    borderRadius: 4,
    border: "none",
    boxShadow: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  input: (provided) => ({
    ...provided,
    margin: "0 16px 0 38px",
    padding: 0,
    color: "var(--color-gray-80)",
    fontSize: 14,
    lineHeight: "24px",
    outline: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    margin: 0,
    padding: "0 16px 0 38px",
    color: "var(--color-gray-80)",
    fontSize: 14,
    lineHeight: "24px",
  }),

  menu: () => ({
    borderTop: "1px solid var(--color-dark-50)",
  }),

  option: (provided, { isSelected, isMulti }) => {
    const multiValueStyles: React.CSSProperties = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };

    return {
      ...provided,
      ...(isMulti ? multiValueStyles : {}),
      margin: "0 0 2px 0",
      padding: "0 16px",
      backgroundColor: "transparent",
      color: "var(--color-dark-80)",
      fontSize: 14,
      lineHeight: "24px",
      fontWeight: isSelected ? 600 : 400,
      cursor: "pointer",

      ":last-child": {
        marginBottom: 0,
      },

      ":active": {
        backgroundColor: "transparent",
        color: "var(--color-dark-80)",
      },
    };
  },

  menuList: (provided) => ({ ...provided, maxHeight: 188 }),

  // singleValue: (provided) => ({ ...provided }),
  // multiValue: (provided) => ({ ...provided }),

  // clearIndicator: (provided) => ({ ...provided }),
  // dropdownIndicator: (provided) => ({ ...provided }),
  // indicatorSeparator: (provided) => ({ ...provided }),
  // multiValueRemove: (provided) => ({ ...provided }),
  // multiValueLabel: (provided) => ({ ...provided }),
  // group: (provided) => ({ ...provided }),
  // groupHeading: (provided) => ({ ...provided }),
  // indicatorsContainer: (provided) => ({ ...provided }),
  // noOptionsMessage: (provided) => ({ ...provided }),
  // loadingMessage: (provided) => ({ ...provided }),
  // loadingIndicator: (provided) => ({ ...provided }),
  // menuPortal: (provided) => ({ ...provided }),
};
