"use client";
import styles from "@/app/styles/Card.module.scss";

export default function Card({
  word,
  isFlipped,
  handleCardFlip,
}: {
  word: string;
  isFlipped: boolean;
  handleCardFlip: () => void;
}) {
  return (
    <>
      <div className={styles.cardCover}>
        <div
          className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
          onClick={handleCardFlip}
        >
          <div className={`${styles.cardFace} ${styles.front}`}>Front</div>
          <div className={`${styles.cardFace} ${styles.back}`}>
            <p>{word}</p>
          </div>
        </div>
      </div>
    </>
  );
}
