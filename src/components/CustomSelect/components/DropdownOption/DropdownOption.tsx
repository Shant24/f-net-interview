import type { GroupBase, OptionProps } from "react-select";
import type { IOption } from "@/types";
import { components } from "react-select";

const DropdownOption = <TOption extends IOption = IOption, IsMulti extends boolean = true>(
  props: OptionProps<TOption, IsMulti, GroupBase<TOption>>,
) => {
  const { children, ...restProps } = props;

  return (
    <components.Option {...restProps}>
      {children}

      {restProps.isMulti && (
        <input type="checkbox" readOnly aria-readonly checked aria-checked disabled={!restProps.isSelected} />
      )}
    </components.Option>
  );
};

export default DropdownOption;
