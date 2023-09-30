import { useState } from "react";
import { updateAddress } from "../../service/apiPuts";
import { AddresPostType } from "../../types/AddressPostType";
import { ErrorMessage, Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import { addressUpdateSchema } from "../../utils/validationsSchemas";
import { Input } from "../Input";
import { ButtonForm } from "../ButtonForm";
import styles from "./styles.module.css";
import { getAddressByZipCode } from "../../service/apiGet";
import { errrorMessages, successMessages } from "../../utils/messages";
import { postAddress } from "../../service/apiPosts";

interface AddressFormProps {
    id?: string;
    address?: AddresPostType;
}

export const AddressForm = ({ id, address }: AddressFormProps) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const OnBlurbuscaEnderecoAddresForm = async (
        e: React.FocusEvent<HTMLInputElement, Element>,
        setFieldValue: (
          field: string,
          value: any,
          shouldValidate?: boolean | undefined
        ) => Promise<void | FormikErrors<AddresPostType>>,
      ) => {
        const cepInitial = e.target.value.replace(/[^0-9]/g, "");
        const cep = cepInitial.replace("-","")
        if (cep.length !== 8) {
          return;
        }
        
        const res = await getAddressByZipCode(cep);
        if (res) {
          setFieldValue("city_id", res?.data.city_id);
          setFieldValue("city", res?.data.city);
          setFieldValue(
            "public_place",
            res?.data.street
          );
          setFieldValue(
            "neighborhood",
            res?.data.neighborhood
          );
          setFieldValue(
            "latitude",
            res?.data.location.coordinates.latitude
          );
          setFieldValue(
            "longitude",
            res?.data.location.coordinates.longitude
          );
        }
      };
      




    if (id && address) {
        const initialvaluesUpdate = {
            name: address.name,
            public_place: address.public_place,
            zip_code: address.zip_code,
            number: address.number,
            neighborhood: address.neighborhood,
            reference: address.reference,
            complement: address.complement,
            city_id: address.city_id,
            latitude: address.latitude,
            longitude: address.longitude,
        }

        const onSubmitUpdate = async (values: AddresPostType) => {
            values.zip_code = values.zip_code.replace("-","")
            const res = await updateAddress(values, id);
            if (res?.status === 200) {
                setShowErrorMessage(false)
                setShowSuccessMessage(true);
            }else{
                setShowSuccessMessage(false)
                setShowErrorMessage(true)
            }
        }

        return (
            <Formik<AddresPostType>
                initialValues={initialvaluesUpdate}
                onSubmit={onSubmitUpdate}
                validationSchema={addressUpdateSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({ errors, touched, isSubmitting ,setFieldValue}) => (
                    <Form className={styles.loginContent} autoComplete="off">

                        <div className={styles.inputsContent}>

                                    <Input
                                        id="zip_code"
                                        type="text"
                                        name="zip_code"
                                        placeholder="Cep"
                                        onBlur={e => OnBlurbuscaEnderecoAddresForm(e, setFieldValue,)}
                                        errors={touched.zip_code && errors.zip_code}
                                    />

                                    <Input
                                        id="public_place"
                                        type="text"
                                        name="public_place"
                                        placeholder="Rua"
                                        errors={false}
                                    />

                                    <div className={styles.contentInput}>
                                        <div className={styles.inputNeighborhood}>
                                            <Field
                                                className={styles.field}
                                                id="neighborhood"
                                                type="text"
                                                name="neighborhood"
                                                placeholder="Bairro"
                                                errors={touched.neighborhood && errors.neighborhood}
                                            />
                                        </div>

                                        <div className={styles.inputNumber}>
                                            <Field
                                                inputSize="small"
                                                className={styles.fiel}
                                                id="number"
                                                type="text"
                                                name="number"
                                                placeholder="Número"
                                                errors={touched.number && errors.number}
                                            />

                                            <ErrorMessage
                                                name="number"
                                            />
                                        </div>
                                    </div>

                                    <Input
                                        id="city"
                                        type="text"
                                        name="city"
                                        placeholder="Cidade"
                                    />

                                    <Input
                                        id="reference"
                                        type="text"
                                        name="reference"
                                        placeholder="Ponde de referência"
                                        errors={touched.reference && errors.reference}
                                    />
                                </div>
                                <section className={styles.ButtonAndMessage}>
                                    
                            <ButtonForm
                                text="Enviar"
                                type="submit"
                                disabled={isSubmitting}
                            />
                            {showSuccessMessage && <p className={styles.successMessage}>{successMessages.address.update}</p>}
                            {showErrorMessage && <p className={styles.successMessage}>{errrorMessages.error.update}</p>}
                                </section>
                    </Form>
                )}
            </Formik>
        );
    }else{
        const initialvaluesAdd = {
            name: "",
            public_place: "",
            zip_code: "",
            number: "",
            neighborhood: "",
            reference: "",
            complement: "",
            city_id: "",
            latitude: 0,
            longitude: 0,
        }

        const onSubmitAdd = async (values: AddresPostType, helper: FormikHelpers<AddresPostType>) => {
            values.zip_code = values.zip_code.replace("-","")
            const res = await postAddress(values);
            if (res?.status === 201) {
                helper.resetForm();
                setShowErrorMessage(false)
                setShowSuccessMessage(true);
            }else{
                setShowSuccessMessage(false)
                setShowErrorMessage(true)
            }
        }

        return (
            <Formik<AddresPostType>
                initialValues={initialvaluesAdd}
                onSubmit={onSubmitAdd}
                validationSchema={addressUpdateSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({ errors, touched, isSubmitting ,setFieldValue}) => (
                    <Form className={styles.loginContent} autoComplete="off">

                        <div className={styles.inputsContent}>

                                    <Input
                                        id="zip_code"
                                        type="text"
                                        name="zip_code"
                                        placeholder="Cep"
                                        onBlur={e => OnBlurbuscaEnderecoAddresForm(e, setFieldValue,)}
                                        errors={touched.zip_code && errors.zip_code}
                                    />

                                    <Input
                                        id="public_place"
                                        type="text"
                                        name="public_place"
                                        placeholder="Rua"
                                        errors={false}
                                    />

                                    <div className={styles.contentInput}>
                                        <div className={styles.inputNeighborhood}>
                                            <Field
                                                className={styles.field}
                                                id="neighborhood"
                                                type="text"
                                                name="neighborhood"
                                                placeholder="Bairro"
                                                errors={touched.neighborhood && errors.neighborhood}
                                            />
                                        </div>

                                        <div className={styles.inputNumber}>
                                            <Field
                                                inputSize="small"
                                                className={styles.fiel}
                                                id="number"
                                                type="text"
                                                name="number"
                                                placeholder="Número"
                                                errors={touched.number && errors.number}
                                            />

                                            <ErrorMessage
                                                name="number"
                                            />
                                        </div>
                                    </div>

                                    <Input
                                        id="city"
                                        type="text"
                                        name="city"
                                        placeholder="Cidade"
                                    />

                                    <Input
                                        id="reference"
                                        type="text"
                                        name="reference"
                                        placeholder="Ponde de referência"
                                        errors={touched.reference && errors.reference}
                                    />
                                </div>
                                <section className={styles.ButtonAndMessage}>
                                    
                            <ButtonForm
                                text="Enviar"
                                type="submit"
                                disabled={isSubmitting}
                            />
                            {showSuccessMessage && <p className={styles.successMessage}>{successMessages.address.add}</p>}
                            {showErrorMessage && <p className={styles.successMessage}>{errrorMessages.error.add}</p>}
                                </section>
                    </Form>
                )}
            </Formik>
        );
    }
}