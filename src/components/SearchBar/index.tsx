import React from "react";
import styles from "./styles.module.css";
import { Formik, Form, Field } from "formik";
import SearchIcon from "../../assets/svgs/SearchIcon.svg";

export const SearchBar = () => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      e.currentTarget.form?.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    }
  };

  const handleSubmit = (values: { search: string }) => {
    console.log("Searching for:", values.search);
  };

  return (
    <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
      <Form>
        <div className={styles.searchContainer}>
          <Field
            type="search"
            name="search"
            placeholder="Pesquise aqui"
            onKeyDown={handleKeyDown}
          />
          <button type="submit">
            <img src={SearchIcon} alt="Search Icon" />
          </button>
        </div>
      </Form>
    </Formik>
  );
};
