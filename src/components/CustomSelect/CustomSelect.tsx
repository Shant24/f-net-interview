import { useState } from "react";
import type {
  GroupBase,
  MultiValue,
  OnChangeValue,
  SelectComponentsConfig,
  SingleValue,
  StylesConfig,
} from "react-select";
import type { IOption } from "@/types";
import Select from "react-select";
import { genericMemo } from "@/helpers";
import DropdownIndicatorIcon from "@/components/icons/DropdownIndicatorIcon";
import Dropdown from "./components/Dropdown";
import DropdownButton from "./components/DropdownButton";
import DropdownInput from "./components/DropdownInput";
import DropdownOption from "./components/DropdownOption";
import { selectStyles } from "./styles";

const components: Partial<SelectComponentsConfig<IOption, false, GroupBase<IOption>>> = {
  DropdownIndicator: () => <DropdownIndicatorIcon />,
  Control: DropdownInput,
  Option: DropdownOption,
  IndicatorSeparator: null,
};

type IOptionValueType<TOption extends IOption = IOption, IsMulti extends boolean = false> =
  | (IsMulti extends true ? TOption[] : TOption)
  | null;

export interface CustomSelectProps<TOption extends IOption = IOption, IsMulti extends boolean = false> {
  options: TOption[];
  label?: string;
  isMulti?: IsMulti;
  styles?: StylesConfig<TOption, IsMulti>;
  errorMessage?: string;
  value: IOptionValueType<TOption, IsMulti>;
  handleValueChange: (value: IOptionValueType<TOption, IsMulti>) => void;
}

const CustomSelect = <TOption extends IOption = IOption, IsMulti extends boolean = false>(
  props: CustomSelectProps<TOption, IsMulti>,
) => {
  const {
    options,
    label,
    isMulti,
    styles = selectStyles as StylesConfig<TOption, IsMulti>,
    errorMessage,
    value,
    handleValueChange,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleClose = () => setIsOpen(false);

  const handleChange = (newValue: OnChangeValue<TOption, IsMulti>) => {
    handleValueChange(newValue as IOptionValueType<TOption, IsMulti>);
    if (!isMulti) {
      handleClose();
    }
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={handleClose}
      target={
        <DropdownButton
          isOpen={isOpen}
          label={label}
          valueLabel={
            isMulti
              ? (value as MultiValue<TOption>)?.map(({ label }) => label).join(", ")
              : (value as SingleValue<TOption>)?.label
          }
          errorMessage={errorMessage}
          onClick={toggleOpen}
        />
      }
    >
      <Select<TOption, IsMulti>
        autoFocus
        backspaceRemovesValue={false}
        components={components as Partial<SelectComponentsConfig<TOption, IsMulti, GroupBase<TOption>>>}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        isClearable={false}
        menuIsOpen={isOpen}
        value={value}
        onChange={handleChange}
        options={options}
        placeholder="Search"
        isMulti={isMulti}
        styles={styles}
        tabSelectsValue={false}
      />
    </Dropdown>
  );
};

export default genericMemo(CustomSelect);
