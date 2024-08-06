import { useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { FakeRequestService } from "@/utils/fakeRequestService";
import styles from "./styles.module.scss";

interface Props {
  isMobile?: boolean;
}

const RequestResponseSwitcher = ({ isMobile }: Props) => {
  const { t } = useTranslation("common");
  const [isSuccess, setIsSuccess] = useState(FakeRequestService.isSuccessful);

  const handleSwitch = () => {
    FakeRequestService.isSuccessful = !isSuccess;
    setIsSuccess(!isSuccess);
  };

  return (
    <label className={clsx(styles.container, isMobile && styles.mobile, !isSuccess && styles.error)}>
      <input type="checkbox" checked={isSuccess} onChange={handleSwitch} />
      {isSuccess ? t("requests.successResponse") : t("requests.errorResponse")}
    </label>
  );
};

export default RequestResponseSwitcher;
