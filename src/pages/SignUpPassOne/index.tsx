import { Background } from "../../components/Background";
import { SignUpPostType } from "../../types/SignUpPostType";
import CadastroImage from "../../assets/images/ClipBoardForm.png";
import React, { useState } from "react";
import { signUp } from "../../service/apiPosts";
import { SignUp } from "../../components/SignUp";
import { FormikErrors } from "formik";
import { getAddressByZipCode } from "../../service/apiGet";
import { useNavigate } from "react-router-dom";
import { CompleteSignUp } from "../../components/CompleteSignUp";
import { SignUpInitialValues } from "../../utils/initialValues";

//TODO Revisão e separação de interfaces

export interface ITelephones {
  number: string;
}

export interface IAddresses {
  name: string;
  public_place: string;
  zip_code: string;
  number: string;
  neighborhood: string;
  reference: string;
  complement: string;
  city_id: string;
  latitude: string;
  longitude: string;
  city?: string;
  [key: string]: string | undefined;
}

export const SignUpPassOne = () => {
  const [data, setData] = useState<SignUpPostType>(SignUpInitialValues);
  const [currentForm, setCurrentForm] = useState(0);
  const navigate = useNavigate();

  const submitSignUp = async (
    formDados: SignUpPostType,
    cliclouPular?: boolean
  ) => {
    console.log("FormSubmit", formDados);

    if (cliclouPular) {
      formDados.addresses_attributes = [];
    }

    console.log("Form dados ", formDados);
    console.log("ClicouPular ", cliclouPular);

    const response = await signUp(formDados);
    console.log("response ta aqui", response);

    if (response !== "Error 422") {
      navigate("/login");
    } else {
      alert("Email ja cadastrado");
    }
  };

  const handleNextForm = (
    newData: Partial<SignUpPostType>,
    isLastForm: boolean,
    clicouPular?: boolean
  ) => {
    setData(prev => ({ ...prev, ...newData }));

    if (isLastForm) {
      submitSignUp({ ...data, ...newData }, clicouPular);
      return;
    }
    setCurrentForm(prev => prev + 1);
  };

  const handlePrevForm = (newData: Partial<SignUpPostType>) => {
    setData(prev => ({ ...prev, ...newData }));
    setCurrentForm(prev => prev - 1);
  };

  const formSignUps = [
    <SignUp next={handleNextForm} data={data} />,
    <CompleteSignUp next={handleNextForm} prev={handlePrevForm} data={data} />
  ];

  console.log("data", data);

  return (
    <Background image={CadastroImage} alt="Imagem de cadastro">
      {formSignUps[currentForm]}
    </Background>
  );
};

export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const OnBlurbuscaEndereco = async (
  e: React.FocusEvent<HTMLInputElement, Element>,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<SignUpPostType>>,
  index: number
) => {
  const cep = e.target.value.replace(/[^0-9]/g, "");
  console.log(cep.length);
  if (cep.length !== 8) {
    return;
  }

  const res = await getAddressByZipCode(cep);
  if (res) {
    setFieldValue(`addresses_attributes[${index}].city_id`, res?.data.city_id);
    setFieldValue(`addresses_attributes[${index}].city`, res?.data.city);
    setFieldValue(
      `addresses_attributes[${index}].public_place`,
      res?.data.street
    );
    setFieldValue(
      `addresses_attributes[${index}].neighborhood`,
      res?.data.neighborhood
    );
    setFieldValue(
      `addresses_attributes[${index}].latitude`,
      res?.data.location.coordinates.latitude
    );
    setFieldValue(
      `addresses_attributes[${index}].longitude`,
      res?.data.location.coordinates.longitude
    );
  }
};
