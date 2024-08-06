import { useEffect, useMemo, useState } from "react";
import type { Country } from "react-phone-number-input/input";
import type { FieldErrors, Path, PathValue } from "react-hook-form";
import type { IOption } from "@/types";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { typedMemo } from "@/helpers";
import clsx from "clsx";
import PhoneInput from "react-phone-number-input/react-hook-form-input";
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input/input";
import { COUNTRIES_LIST } from "@/constants";
import FiledWrapper from "@/components/Form/FiledWrapper";
import CustomSelect from "@/components/Form/CustomSelect";
import DropdownButton from "@/components/DropdownButton";
import styles from "./styles.module.scss";

interface Props<T extends {} = { phone: string }> {
  fieldKey: Path<T>;
  defaultCountry?: Country;
  initialPhoneNumber?: string;
  containerClassName?: string;
}

const PhoneNumberInput = <T extends {} = { phone: string }>(props: Props<T>) => {
  const { fieldKey, defaultCountry, initialPhoneNumber, containerClassName } = props;
  const { t, i18n } = useTranslation("form");
  const labels = COUNTRIES_LIST[i18n.language];
  const initialPhoneNumberData = parsePhoneNumber(
    isValidPhoneNumber(initialPhoneNumber ?? "") ? (initialPhoneNumber ?? "") : "",
  );
  const [isFocused, setIsFocused] = useState(false);
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<T>();

  const value = watch(fieldKey);
  const errorMessage = errors[fieldKey as keyof FieldErrors<T>]?.message;

  const selectOptions: IOption[] = useMemo(
    () =>
      getCountries().map((country) => ({
        value: country,
        label: `${labels[country]} +${getCountryCallingCode(country)}`,
      })),
    [labels],
  );

  const [country, setCountry] = useState<IOption | null>(
    selectOptions.find(({ value }) => value === initialPhoneNumberData?.country || value === defaultCountry) ?? null,
  );

  useEffect(() => {
    if (initialPhoneNumberData) {
      if (!country) {
        setCountry(selectOptions.find(({ value }) => value === initialPhoneNumberData?.country) ?? null);
      }

      if (!value) {
        setValue(fieldKey, (initialPhoneNumberData?.number ?? "") as PathValue<T, Path<T>>);
      }
    }
  }, [country, fieldKey, initialPhoneNumberData, selectOptions, setValue, value]);

  useEffect(() => {
    if (!country && value && isValidPhoneNumber(value)) {
      const phoneNumberData = parsePhoneNumber(value);
      setCountry(selectOptions.find(({ value }) => value === phoneNumberData?.country) ?? null);
    }
  }, [country, selectOptions, value]);

  useEffect(() => {
    setCountry(selectOptions.find(({ value }) => value === country?.value) ?? country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <FiledWrapper className={clsx(styles.container, containerClassName)} errorMessage={errorMessage as string}>
      <PhoneInput
        name={fieldKey}
        control={control}
        smartCaret
        international={false}
        withCountryCallingCode={false}
        useNationalFormatForDefaultCountryValue
        defaultValue={initialPhoneNumber}
        autoComplete="tel"
        className={clsx(styles.phoneInput, isFocused && styles.inputFocus, errorMessage && styles.error)}
        placeholder={t("titles.phone")}
        defaultCountry={defaultCountry}
        country={country?.value as Country}
      />

      <CustomSelect
        name="county-select"
        containerClassName={styles.selectContainer}
        value={country}
        errorMessage={errorMessage as string | undefined}
        label={t("titles.selectCode")}
        onChange={setCountry}
        setIsFocused={setIsFocused}
        isMulti={false}
        options={selectOptions}
        renderDropdownButton={(renderProps) => (
          <DropdownButton
            {...renderProps}
            valueLabel={country ? `+${getCountryCallingCode(country.value as Country)}` : ""}
            className={clsx(
              styles.countryButton,
              errorMessage && styles.selectError,
              renderProps.isOpen && styles.buttonFocus,
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            hideIcon
          />
        )}
      />
    </FiledWrapper>
  );
};

export default typedMemo(PhoneNumberInput);
