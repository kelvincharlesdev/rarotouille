interface AuthImgProps {
  src: string;
  alt: string;
}

export const AuthImg = ({ src, alt }: AuthImgProps) => {
  return <img src={src} alt={alt} />;
};
