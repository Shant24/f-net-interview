import LoadingIcon from "@/components/LoadingIcon";
import styles from "./styles.module.scss";

const PageLoading = () => {
  return (
    <div className={styles.pageLoaderContainer}>
      <LoadingIcon icon="oval" color="var(--color-primary)" className={styles.pageLoader} />
    </div>
  );
};

export default PageLoading;
