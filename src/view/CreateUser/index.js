import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FiTerminal, FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import br from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { createUserValidation } from '../../validations/YupValidations';
import { createUserInitialValues as initialValues } from '../../validations/FormConstants';

import './styles.css';

export default function CreateUser() {
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const history = useHistory();

  registerLocale('pt', br);

  async function handleCreateUser(values) {
    if (!dateOfBirth){
      alert('Preencha a data de nascimento');
      return
    }

    const data = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      date_of_birth: dateOfBirth
    }

    try {
      await api.post('users', data);
  
      alert('Usuário cadastrado com sucesso!');
  
      history.push('/');
    } catch (error) {
      alert('Erro ao cadastrar usuário, tente novamente mais tarde');
    }
  }

  return(
    <div className="create-user-container">        
      <header>
        <div className="welcome-group">
          <FiTerminal size={40} color="#e02041" />
          <span>Bem vindo!</span>
        </div>
        <Link className="button" to="/" >
          Home
        </Link>
      </header>
      
      <div className="content">
        <div className="content-elements">
          <section>
            <div className="page-welcome">
              <FiTerminal size={40} color="#e02041"/>
              <h1>Cadastre um novo usuário!</h1>
            </div>
            <p>Insira as informações do usuário que deseja cadastrar!</p>
            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041" />
              <span>Voltar</span>
            </Link>
          </section>
          <Formik 
            initialValues={initialValues} 
            onSubmit={handleCreateUser} 
            validationSchema={createUserValidation}>

            { props => {
              const {
                touched, errors, isSubmitting
              } = props;

              return(
                <Form autoComplete="off">
                  <Field 
                    placeholder="Nome do usuário" 
                    name="name" 
                    className={errors.name && touched.name && "failed-field"} />
                  <div className="error-messages">
                    <ErrorMessage component="span" name="name" />
                  </div>
                  <Field 
                    placeholder="Email do usuário" 
                    name="email" 
                    className={errors.email && touched.email && "failed-field"} />
                  <div className="error-messages">
                    <ErrorMessage component="span" name="email" />
                  </div>
                  <Field 
                    placeholder="Telefone do usuário"
                    name="phone" 
                    className={errors.phone && touched.phone && "failed-field"} />
                  <div className="error-messages">
                    <ErrorMessage component="span" name="phone" />
                  </div>
                  <DatePicker 
                    className="birth-box"
                    selected={dateOfBirth} 
                    onChange={date => {
                      setDateOfBirth(date);
                    }}
                    placeholderText="Data de nascimento"
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()} 
                    locale='pt'
                    showYearDropdown
                    scrollableYearDropdown
                  />
                  <button className="button" type="submit" disabled={isSubmitting}>
                    Atualizar informações
                  </button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div> 
    </div>
  );
}