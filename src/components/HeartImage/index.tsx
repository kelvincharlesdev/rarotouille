import styles from "./styles.module.css";

interface HeartImageProps{
    likeImage: string;
    noLikeImage: string;
    liked_by_me: boolean;
}

//TODO ver como é que vai ser definido esse like
export const HeartImage = ({likeImage, noLikeImage, liked_by_me}: HeartImageProps) => {
    return (<>

        {liked_by_me ? (
            <button
              className={styles.likeButton}
              type="button"
              onClick={()=>{}}
            >
              {" "}
              <img src={likeImage} alt="heartLiked" />{" "}
            </button>
          ) : (
            <button
              className={styles.likeButton}
              type="button"
              onClick={()=>{}}
            >
              {" "}
              <img src={noLikeImage} alt="heartNoLiked" />{" "}
            </button>
          )}
    </>
    );
          }