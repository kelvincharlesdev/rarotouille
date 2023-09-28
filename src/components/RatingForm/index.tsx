import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { RatingPostType } from "../../types/RatingPostType";
import { ratingInitialValues } from "../../utils/initialValues";
import { ButtonForm } from "../ButtonForm";
import { Input } from "../Input";
import styles from "./styles.module.css";
import { ratingSchema } from "../../utils/validationsSchemas";
import { useCartContext } from "../../contexts/CartContext";
import { useState } from "react";
import { postRating } from "../../service/apiPosts";

interface RatingFormProps {
  setStepPartial: (stepPartial: number) => void;
  setActualStep: (actualStep: number) => void;
}

export const RatingForm = ({
  setStepPartial,
  setActualStep
}: RatingFormProps) => {
  const { cartOrders, removeAllDishesToCart } = useCartContext();
  const [stepRatingForm, setStepRatingForm] = useState(0);
  const lastStepRatingForm = cartOrders.length - 1;
  const backToCartStart = () => {
    removeAllDishesToCart();
    setActualStep(0);
  };

  const skipStep = () => {
    if (stepRatingForm === lastStepRatingForm) {
      backToCartStart();
    }
    setStepRatingForm(prev => prev + 1);
  };

  const handleSubmit = async (
    values: RatingPostType,
    helper: FormikHelpers<RatingPostType>
  ) => {
    const res = await postRating(
      {
        comment: values.comment,
        rate: Number(values.rate)
      },
      cartOrders[stepRatingForm].dish.id
    );
    if (res) {
      setStepRatingForm(prev => prev + 1);
      helper.resetForm();
    }
    if (stepRatingForm === lastStepRatingForm) {
      setStepPartial(2);
    }
  };
  return (
    <div className={styles.fomrAndBackButton}>
      <Formik<RatingPostType>
        initialValues={ratingInitialValues}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={ratingSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <main className={styles.mainContent}>
              <div className={styles.imageAndTextContent}>
                <p className={styles.avaliateTitle}>
                  Eaí, o que achou do pedido?
                </p>
                <div className={styles.commentAndRating}>
                  <section className={styles.nameAndRating}>
                    <p className={styles.dishName}>
                      {cartOrders[stepRatingForm].dish.name}
                    </p>
                    <Field
                      component="select"
                      id="rate"
                      name="rate"
                      className={styles.selectRating}
                      errors={touched.rate && errors.rate}
                      mutiple={false}
                    >
                      <option disabled selected value="">
                        Nota
                      </option>
                      <option value="5">5 estrelas</option>
                      <option value="4">4 estrelas</option>
                      <option value="3">3 estrelas</option>
                      <option value="2">2 estrelas</option>
                      <option value="1">1 estrelas</option>
                    </Field>
                  </section>
                  <Input
                    name="comment"
                    id="comment"
                    className={styles.input}
                    placeholder="Escreva a sua avaliação"
                    errors={touched.comment && errors.comment}
                  />
                  <p className={styles.errorSelect}>
                    <ErrorMessage name="rate" />
                  </p>
                </div>
              </div>
            </main>
            <footer className={styles.cartFooter}>
              <ButtonForm
                text="Enviar"
                className={styles.avaliateButton}
                type="submit"
              />
            </footer>
          </Form>
        )}
      </Formik>
      <button className={styles.backButton} onClick={skipStep}>
        Pular avaliação deste prato
      </button>
    </div>
  );
};
