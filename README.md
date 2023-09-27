# Projeto Final

- Iniciando

  - Primeiras regras

    - Dar GIT PULL sempre que abrir o projeto localmente pra atualizar com todos os dados corretamente
    - Sempre que terminar a task dar um npm run format para identação do código antes de subir

  - Nome: Rarotouille ( Nem pagou ja chegou)
  - Publico Alvo : 18 a 35 anos
  - O que faz/ Oque resolve/ Os beneficios

- Regras de Padronização

  - NODE vs 18.17.0
  - Padrão de nomenclatura de componente/variáveis : Inglês;
  - Commit
    - 1. “feat: Implementa componente Button”
    - 2. “fix: Implementa correção de Button”
    - 3. “style: Implementa style componente Button”
  - Usaremos Css Module
    - Modo de importação
      > import styles from "./styles.module.css";
    - Como usar ex:
      > button className={styles.button}>
    - Nome do arquivo
      > styles.module.css

- Figma

  - Paleta de cores: Azul Raro/Ratatoulle
  - Font: Poppins e San-serif
  - Font size: basear no figma

    - font-weight{

      - 800
      - 700
      - 600
      - 500
      - 400

      }

    - Unidade de medida : px

- Estrutura de pastas
  - components
    - Pasta
      - index.tsx
      - styles.module.css
  - hooks
  - contexts
  - services
  - styles
  - Pages
  - Routes
    OBS: Dentro de cada pasta podemos ter um index.ts e dentro dele dar um export em que precisarmos isso facilita nas outras exportações
- nomeclatura

  - Component ⇒ pascal case ( DessaFormaAqui)

- Export

  - Todos export seram feitos dessa maneira:

    - export const exemplo = ( ) ⇒ {
      }

- Bibliotecas

  - Formik
  - Yup
  - Axios
  - Jest
  - Cypress
  - router-dom
  - react-google-maps/api

  
- Config prettier
  - Aspas duplas “ ”
  - ponto e virgula no final ;
