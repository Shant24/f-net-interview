import { useMemo, useState } from "react";
import type {
  GroupBase,
  MultiValue,
  OnChangeValue,
  SelectComponentsConfig,
  SingleValue,
  StylesConfig,
} from "react-select";
import type { IOption } from "@/types";
import type { DropdownButtonProps } from "@/components/DropdownButton";
import Select from "react-select";
import { typedMemo } from "@/helpers";
import DropdownIndicatorIcon from "@/components/icons/DropdownIndicatorIcon";
import DropdownButton from "@/components/DropdownButton";
import FiledWrapper from "@/components/Form/FiledWrapper";
import Dropdown from "./components/Dropdown";
import DropdownInput from "./components/DropdownInput";
import DropdownOption from "./components/DropdownOption";
import { customSelectStyles } from "./styles";

const defaultComponents: Partial<SelectComponentsConfig<IOption, false, GroupBase<IOption>>> = {
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
  containerClassName?: string;
  components?: Partial<SelectComponentsConfig<TOption, IsMulti, GroupBase<TOption>>>;
  value: IOptionValueType<TOption, IsMulti>;
  handleValueChange: (value: IOptionValueType<TOption, IsMulti>) => void;
  renderDropdownButton?: (props: DropdownButtonProps) => JSX.Element;
}

const CustomSelect = <TOption extends IOption = IOption, IsMulti extends boolean = false>(
  props: CustomSelectProps<TOption, IsMulti>,
) => {
  const {
    options,
    label,
    isMulti,
    styles = customSelectStyles as StylesConfig<TOption, IsMulti>,
    errorMessage,
    containerClassName,
    components,
    value,
    handleValueChange,
    renderDropdownButton,
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

  const buttonProps = useMemo(
    () => ({
      isOpen,
      label,
      valueLabel: isMulti
        ? (value as MultiValue<TOption>)?.map(({ label }) => label).join(", ")
        : (value as SingleValue<TOption>)?.label,
      errorMessage,
      onClick: toggleOpen,
    }),
    [errorMessage, isMulti, isOpen, label, value],
  );

  return (
    <Dropdown
      className={containerClassName}
      isOpen={isOpen}
      onClose={handleClose}
      target={
        renderDropdownButton?.(buttonProps) ?? (
          <FiledWrapper errorMessage={errorMessage}>
            <DropdownButton {...buttonProps} />
          </FiledWrapper>
        )
      }
    >
      <Select<TOption, IsMulti>
        autoFocus
        backspaceRemovesValue={false}
        components={{
          ...(defaultComponents as Partial<SelectComponentsConfig<TOption, IsMulti, GroupBase<TOption>>>),
          ...components,
        }}
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

export default typedMemo(CustomSelect);
