import type { IOption } from "@/types";
import type { IOptionValueType } from "@/components/Form/CustomSelect";
import type { Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { typedMemo } from "@/helpers";
import CustomSelect from "@/components/Form/CustomSelect";

interface Props<T extends {} = {}, IsMulti extends boolean = false> {
  isMulti?: IsMulti;
  fieldKey: Path<T>;
  label: string;
  options: IOption[];
}

const FormSelect = <T extends {} = {}, IsMulti extends boolean = boolean>(props: Props<T, IsMulti>) => {
  const { isMulti, fieldKey, label, options } = props;
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={fieldKey}
      control={control}
      render={({ field: { value, onChange, ...buttonProps }, fieldState: { error } }) => {
        return (
          <>
            <CustomSelect<IOption, IsMulti>
              {...buttonProps}
              label={label}
              options={options}
              isMulti={isMulti}
              errorMessage={error?.message}
              value={
                (isMulti
                  ? options.filter((option) => (value as string[])?.includes(option.value))
                  : (options.find((option) => option.value === value) ?? null)) as IOptionValueType<IOption, IsMulti>
              }
              onChange={(options) => {
                onChange(isMulti ? (options as IOption[])?.map((option) => option.value) : (options as IOption)?.value);
              }}
            />
          </>
        );
      }}
      rules={{ required: true }}
    />
  );
};

export default typedMemo(FormSelect);
