import styles from "./styles.module.css";

export const Slogan = () => {
  return (
    <p className={styles.slogan}>
      Uma experiência <span className={styles.sloganRaro}>Raro</span> de
      delivery jamais vista
    </p>
  );
};
