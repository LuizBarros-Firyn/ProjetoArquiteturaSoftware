import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import notFound from '../../assets/not_found.svg';
import { FiTerminal } from 'react-icons/fi';

import './styles.css';

export default function Main() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('users', {}).then(response => {
      setUsers(response.data);
    });
  }, []);

  async function handleIdSearch(id) {
    const query = id ? `users/${id}` : 'users' 

    try{
      await api.get(query).then(response => {
        setUsers(response.data);
      });
    } catch (e) {
      setUsers([]);
    }
  }

  async function handleDeleteUser(id) {
    try {
      await api.delete(`users/${id}`);

      setUsers(users.filter(user => user._id !== id));
    } catch {
      alert('Erro ao deletar usuário, tente novamente mais tarde');
    }
  }

  function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString('pt-BR',options);
  }

  return(
    <div className="main-container">        
      <header>
        <div className="welcome-group">
          <FiTerminal size={40} color="#e02041" />
          <span>Bem vindo!</span>
        </div>
        <div className="features">
          <Link className="button" to={`/create_user`}>
            Cadastrar um novo usuário!
          </Link>
        </div>
      </header>
      <div className="top-content">
        <h1>Listagem de usuários</h1>
        <input
          placeholder="Digite o ID do usuário desejado aqui"
          onChange={e => handleIdSearch(e.target.value)} />
      </div>
      {users && !users.length > 0 ?
        <div className="not-found">
          <h1>Nenhum usuário encontrado!</h1>
          <img src={notFound} alt="No Projects Found" />
          <Link className="button" to="/create_user" >
            Cadastrar um usuário!
          </Link>
        </div>
      :
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <strong>ID:</strong>
              <p>{user._id}</p>
              <strong>NOME:</strong>
              <p>{user.name}</p>
              <strong>Email:</strong>
              <p>{user.email}</p>
              <strong>Telefone:</strong>
              <p>{user.phone}</p>
              <strong>Data de Nascimento:</strong>
              <p>{formatDate(user.date_of_birth)}</p>
              <div className="options">
                <Link to={`edit_user/${user._id}`} className="button">
                  Editar
                </Link>
                <button onClick={() => handleDeleteUser(user._id)} className="button">Excluir</button>
              </div>
            </li>
        ))}
        </ul>
      }
    </div>
  );
}