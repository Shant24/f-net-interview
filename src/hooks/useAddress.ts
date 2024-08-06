import { useCallback, useEffect, useMemo, useState } from "react";
import type { IOption } from "@/types";
import { getCountries } from "react-phone-number-input";
import { useTranslation } from "react-i18next";
import { COUNTRIES_LIST } from "@/constants";

interface IAllCountries {
  country: string;
  regionState: string;
  city: string;
}

interface IUseAddressParams<Combine extends boolean = false> {
  selectedCountryCode: string;
  selectedRegionState?: Combine extends true ? never : string | undefined;
  shouldCombineStatesToCities?: Combine;
}

export const useAddress = <Combine extends boolean = false>(params: IUseAddressParams<Combine>) => {
  const { selectedCountryCode, selectedRegionState, shouldCombineStatesToCities } = params;
  const { i18n } = useTranslation();

  const regions = COUNTRIES_LIST[i18n.language];
  const countryOptions: IOption[] = useMemo(
    () => getCountries().map((country) => ({ value: country, label: regions[country] })),
    [regions],
  );

  const [allCityOptions, setAllCityOptions] = useState<IAllCountries[]>([]);
  const [regionStateOptions, setRegionStateOptions] = useState<IOption[]>([]);
  const [cityOptions, setCityOptions] = useState<IOption[]>([]);

  const injectData = useCallback(
    (data: IAllCountries[]) => {
      const filteredCountries = data.filter(({ country }) => country === selectedCountryCode);

      if (shouldCombineStatesToCities) {
        const transformedCities = filteredCountries.map(({ city, regionState }) => {
          const newLabel = `${city}, ${regionState}`;
          return { value: newLabel, label: newLabel };
        });

        setCityOptions(transformedCities);
        return;
      }

      const uniqueRegionStates = Array.from(new Set(filteredCountries.map(({ regionState }) => regionState))).filter(
        Boolean,
      );
      setRegionStateOptions(uniqueRegionStates.map((regionState) => ({ value: regionState, label: regionState })));

      const filteredCities = filteredCountries.filter(({ regionState }) => regionState === selectedRegionState);
      setCityOptions(filteredCities.map(({ city }) => ({ value: city, label: city })));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCountryCode, selectedRegionState],
  );

  useEffect(() => {
    if (selectedCountryCode && allCityOptions.length === 0) {
      import("@/data/cities.json")
        .then<void>((data) => {
          const allData = data.default as IAllCountries[];
          setAllCityOptions(allData);
          injectData(allData);
        })
        .catch(() => {
          console.error("Error while fetching cities");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountryCode]);

  useEffect(() => {
    if (selectedCountryCode && allCityOptions.length > 0) {
      injectData(allCityOptions);
    }
  }, [selectedCountryCode, allCityOptions, selectedRegionState, injectData]);

  return {
    countryOptions,
    regionStateOptions,
    cityOptions,
  };
};
