import React from 'react';
import MinhaImagem from '../../assets/images/Logo.png';
import styles from './styles.module.css';


function MeuComponente() {
  return (
    <>
      <div className={styles.logo}>
      <img className={styles.imageHat} src={MinhaImagem} alt="" />
      <h1 className={styles.title1}>Raro<span className={styles.title2}>touille</span></h1>
      </div>
    </>
  );
}

export default MeuComponente;