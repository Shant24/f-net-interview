import { memo, useEffect, useMemo, useState } from "react";
import type { Country } from "react-phone-number-input/input";
import type { IOption } from "@/types";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input/react-hook-form-input";
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input/input";
import FiledWrapper from "@/components/FiledWrapper";
import CustomSelect from "@/components/CustomSelect";
import DropdownButton from "@/components/DropdownButton";
import en from "react-phone-number-input/locale/en";
import hy from "react-phone-number-input/locale/hy";
import ru from "react-phone-number-input/locale/ru";
import styles from "./styles.module.scss";

const labelLocales: Record<string, Record<string, string>> = {
  en: { ...en, ZZ: "" },
  hy: { ...hy, ZZ: "" },
  ru: { ...ru, ZZ: "" },
};

interface Props {
  fieldKey?: string;
  defaultCountry?: Country;
  initialPhoneNumber?: string;
  containerClassName?: string;
}

const PhoneNumberInput = (props: Props) => {
  const { fieldKey = "phone", defaultCountry, initialPhoneNumber, containerClassName } = props;
  const { t, i18n } = useTranslation("form");
  const labels = labelLocales[i18n.language];
  const initialPhoneNumberData = parsePhoneNumber(
    isValidPhoneNumber(initialPhoneNumber ?? "") ? (initialPhoneNumber ?? "") : "",
  );
  const { control, formState, watch, setValue } = useFormContext();

  const value = watch(fieldKey);
  const error = formState.errors[fieldKey]?.message;

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
        setValue(fieldKey, initialPhoneNumberData?.number ?? "");
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
    <FiledWrapper className={clsx(styles.container, containerClassName)} errorMessage={error?.toString()}>
      <CustomSelect
        containerClassName={styles.selectContainer}
        value={country}
        errorMessage={error as string}
        label={t("titles.selectCode")}
        handleValueChange={setCountry}
        isMulti={false}
        options={selectOptions}
        renderDropdownButton={(renderProps) => (
          <DropdownButton
            {...renderProps}
            valueLabel={country ? `+${getCountryCallingCode(country.value as Country)}` : ""}
            className={styles.countryButton}
            hideIcon
          />
        )}
      />

      <PhoneInput
        name={fieldKey}
        control={control}
        smartCaret
        international={false}
        withCountryCallingCode={false}
        useNationalFormatForDefaultCountryValue
        defaultValue={initialPhoneNumber}
        autoComplete="tel"
        className={clsx(styles.phoneInput, error && styles.error)}
        placeholder={t("titles.phone")}
        defaultCountry={defaultCountry}
        country={country?.value as Country}
      />
    </FiledWrapper>
  );
};

export default memo(PhoneNumberInput);
