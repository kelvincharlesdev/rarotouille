import styles from "./styles.module.css";

interface AuthTitleProps {
  title: string;
  subTitle?: string;
}

export const AuthTitle = ({ title, subTitle }: AuthTitleProps) => {
  return (
    <div className={styles.content}>
      <article className={styles.title}>{title}</article>
      <article className={styles.subTitle}>{subTitle}</article>
    </div>
  );
};
