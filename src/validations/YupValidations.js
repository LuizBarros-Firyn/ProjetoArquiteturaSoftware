import * as Yup from 'yup';

export function createUserValidation() {
  const schema = Yup.object().shape({
    name: Yup.string().min(2, "Nome inválido")
      .max(50, "Nome inválido")
      .required("Nome obrigatório"),
    email: Yup.string().min(4, "Email inválido")
      .max(120, "Email inválido")
      .email("Email inválido")
      .required("Email obrigatório"),
    phone: Yup.string()
      .min(8, "Numero inválido")
      .max(12, "Numero inválido")
      .required("Numero obrigatório"),
  });

  return schema;
};

export function editUserValidation() {
  const schema = Yup.object().shape({
    name: Yup.string().min(2, "Nome inválido")
      .max(50, "Nome inválido")
      .required("Nome obrigatório"),
    phone: Yup.string()
      .min(8, "Numero inválido")
      .max(12, "Numero inválido")
      .required("Numero obrigatório"),
  });

  return schema;
};