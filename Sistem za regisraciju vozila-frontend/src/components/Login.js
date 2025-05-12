import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  const [user, setUser] = useState({
    userName: "",
    password: "",
  })
  const { userName, password } = user;
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const OnInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:8080/user/getByUserName/" + userName)
      .then((response) => {
        if (response.data.password === password) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/home");
        }
        else {
          setErrorMessage('Lozinka je netačna. Provjerite svoju lozinku i pokušajte ponovo.');
        }
      })
      .catch(() => {
        setErrorMessage("Korisnik sa ovim korisničkim imenom nije pronađen!");
      })
  };

  return (
    <div className="container-login">
      <form onSubmit={(e) => onSubmit(e)} className='row'>
        <div className='col-md-10 offset-md-1 border rounded p-3 mt-3 mb-2 shadow bg-light'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="https://i.imgur.com/oxpHueC.png" alt="" style={{ width: '200px', height: '200px', borderRadius: '10%' }} />
                    </div>
          <h3 className='text-center'>Prijavi se</h3>
          <div className='mb-2 px-4'>
            <label htmlFor='Username' className='form-label'>Korisničko me:</label>
            <input type='text'
              className='form-control'
              placeholder='Unesite svoje korisničko ime.'
              name='userName'
              value={userName}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-3 px-4'>
            <label htmlFor='Password' className='form-label'>Lozinka:</label>
            <input type='password'
              className='form-control'
              placeholder='Unesite lozinku.'
              name='password'
              value={password}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-3 px-4'>
            <button type='submit' className='btn btn-primary custom-btn mb-3' >Prijavi se</button>
            {errorMessage && <div className="error-message text-center text-danger">{errorMessage}</div>}
          </div>

          <Link to="/signUp" className='text-decoration-none custom-btn'>Još nemaš profil? Registruj se!</Link>
        </div>

      </form>
    </div>
  )
}
