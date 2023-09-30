import React, { useEffect, useRef, useState } from "react";
import { api } from "../../service/api";
import { DishType } from "../../types/DishType";
import styles from "./styles.module.css";
import { FiSearch } from "react-icons/fi";
import { Field, Form, Formik } from "formik";
import { Dish } from "../../types/Dish";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const [searchResults, setSearchResults] = useState<DishType | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target as Node)
      ) {
        setSearchResults(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      handleSearch(searchTerm);
    }
  };

  const handleSearch = async (term: string) => {
    console.log("Chamando handleSearch com term:", term);
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      try {
        setLoading(true);
        const response = await api.get("/dishes", {
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          params: {
            term: term
          }
        });
        console.log("Resposta da API:", response.data);

        if (response.data) {
          setSearchResults(response.data);
        } else {
          setSearchResults(null);
          console.log(
            "A propriedade 'id' não está presente no objeto de resposta"
          );
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      handleSearch(value);
    } else {
      setSearchResults(null);
    }
  };

  return (
    <div ref={searchBarRef}>
      <Formik initialValues={{ search: searchTerm }} onSubmit={() => {}}>
        <Form>
          <div className={styles.searchContainer}>
            <Field
              type="search"
              name="search"
              placeholder="Pesquise aqui"
              onKeyDown={handleKeyDown}
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button type="submit" aria-label="Search">
              <FiSearch className={styles.icon} />
            </button>
          </div>
        </Form>
      </Formik>
      <div className={styles.searchContent}>
        {loading && <p>Carregando sugestões...</p>}
        {searchResults && searchResults.data.length > 0 && (
          <div className={styles.searchResults}>
            {searchResults.data.slice(0, 8).map((result: Dish) => (
              <div key={result.id} className={styles.searchResultItem}>
                <Link to={`/dishDetails/${result.id}`} className={styles.link}>
                  <img src={result.images} alt="" />
                  <h2>{result.name}</h2>
                </Link>
              </div>
            ))}
          </div>
        )}
        {searchResults && searchResults.data.length === 0 && (
          <p>Nenhum prato encontrado.</p>
        )}
      </div>
    </div>
  );
};
