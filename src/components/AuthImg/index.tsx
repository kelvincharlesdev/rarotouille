import styles from "./styles.module.css";

interface AuthImgProps {
  src: string;
  alt: string;
}

export const AuthImg = ({ src, alt }: AuthImgProps) => {
  return <img className={styles.image} src={src} alt={alt} />;
};
