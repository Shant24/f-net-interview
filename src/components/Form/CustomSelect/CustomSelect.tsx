import { forwardRef, useEffect, useMemo, useState } from "react";
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
import { useTranslation } from "react-i18next";
import { typedMemo } from "@/helpers";
import Select from "react-select";
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

export type IOptionValueType<TOption extends IOption = IOption, IsMulti extends boolean = false> =
  | (IsMulti extends true ? TOption[] : TOption)
  | null;

export interface CustomSelectProps<TOption extends IOption = IOption, IsMulti extends boolean = false> {
  options: TOption[];
  name?: string;
  label?: string;
  isMulti?: IsMulti;
  disabled?: boolean;
  styles?: StylesConfig<TOption, IsMulti, GroupBase<TOption>>;
  errorMessage?: string;
  containerClassName?: string;
  components?: Partial<SelectComponentsConfig<TOption, IsMulti, GroupBase<TOption>>>;
  value: IOptionValueType<TOption, IsMulti>;
  onChange: (value: IOptionValueType<TOption, IsMulti>) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  renderDropdownButton?: (props: DropdownButtonProps) => JSX.Element;
}

// give me type of CustomSelect
type CustomSelectType = <TOption extends IOption = IOption, IsMulti extends boolean = false>(
  props: CustomSelectProps<TOption, IsMulti> & React.RefAttributes<HTMLButtonElement>,
) => React.ReactElement;

const CustomSelect = forwardRef(
  <TOption extends IOption = IOption, IsMulti extends boolean = false>(
    props: CustomSelectProps<TOption, IsMulti>,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const {
      options,
      label,
      name,
      isMulti,
      disabled,
      styles = customSelectStyles as StylesConfig<TOption, IsMulti>,
      errorMessage,
      containerClassName,
      components,
      value,
      onChange,
      onBlur,
      setIsFocused,
      renderDropdownButton,
    } = props;
    const { t } = useTranslation("form");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      document.head
        .querySelector('meta[name="viewport"]')
        ?.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0");

      return () => {
        document.head
          .querySelector('meta[name="viewport"]')
          ?.setAttribute("content", "width=device-width, initial-scale=1.0");
      };
    }, []);

    useEffect(() => {
      setIsFocused?.(isOpen);
    }, [isOpen, setIsFocused]);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    const handleClose = () => setIsOpen(false);

    const handleChange = (newValue: OnChangeValue<TOption, IsMulti>) => {
      onChange(newValue as IOptionValueType<TOption, IsMulti>);
      if (!isMulti) {
        handleClose();
      }
    };

    const buttonProps = useMemo(
      () => ({
        ref,
        isOpen,
        label,
        name,
        disabled,
        valueLabel: isMulti
          ? (value as MultiValue<TOption>)?.map(({ label }) => label).join(", ")
          : (value as SingleValue<TOption>)?.label,
        errorMessage,
        onClick: toggleOpen,
        onBlur,
      }),
      [disabled, errorMessage, isMulti, isOpen, label, name, onBlur, ref, value],
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
          placeholder={t("search")}
          isMulti={isMulti}
          styles={styles}
          tabSelectsValue={false}
          noOptionsMessage={() => t("noOptions")}
        />
      </Dropdown>
    );
  },
);

export default typedMemo(CustomSelect) as CustomSelectType;
