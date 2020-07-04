import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FiTerminal, FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import br from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import { editUserValidation } from '../../validations/YupValidations';
import { editUserInitialValues as initialValues } from '../../validations/FormConstants';

import './styles.css';

export default function EditUser(props) {
  const [user, setUser] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const userId = props.match.params.user_id

  const history = useHistory();

  registerLocale('pt', br);

  useEffect(() => {
    api.get(`users/${userId}`).then(
      response => setUser(response.data)
    );
    console.log(initialValues);
  }, [userId]);

  async function handleUpdateUser(values) {
    if (!dateOfBirth){
      alert('Preencha a data de nascimento');
      return
    }

    const data = {
      name: values.name,
      phone: values.phone,
      date_of_birth: dateOfBirth
    }

    try {
      await api.put(`users/${props.match.params.user_id}`, data);
  
      alert('Usuário atualizado com sucesso!');
  
      history.push('/');
    } catch (error) {
      alert('Erro ao editar usuário, tente novamente mais tarde');
    }
  }

  return(
    <div className="edit-user-container">        
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
              <h1>Edite as informações de {user.name}</h1>
            </div>
            <p>Aqui você pode sempre editar as informações dos usuários!</p>
            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041" />
              <span>Voltar</span>
            </Link>
          </section>
          <Formik 
            initialValues={initialValues} 
            onSubmit={handleUpdateUser} 
            validationSchema={editUserValidation}>

            { props => {
              const {
                touched, errors, isSubmitting
              } = props;

              return(
                <Form autoComplete="off">
                  <strong>NOME:</strong>
                  <Field 
                    placeholder={user.name} 
                    name="name" 
                    className={errors.name && touched.name && "failed-field"} />
                  <div className="error-messages">
                    <ErrorMessage component="span" name="name" />
                  </div>
                  <strong>Telefone:</strong>
                  <Field 
                    placeholder={user.phone} 
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