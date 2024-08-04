import type { ControlProps, GroupBase } from "react-select";
import type { IOption } from "@/types";
import { components } from "react-select";
import clsx from "clsx";
import SearchIcon from "@/components/icons/SearchIcon";
import styles from "./styles.module.scss";

const DropdownInput = <TOption extends IOption = IOption, IsMulti extends boolean = false>(
  props: ControlProps<TOption, IsMulti, GroupBase<TOption>>,
) => {
  const { children, className, ...controlProps } = props;

  return (
    <components.Control {...controlProps} className={clsx(className)}>
      <SearchIcon className={styles.icon} />

      {(children as React.ReactNode[])?.[0]}
    </components.Control>
  );
};

export default DropdownInput;
