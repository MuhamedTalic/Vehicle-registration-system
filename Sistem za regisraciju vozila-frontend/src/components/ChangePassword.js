import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftNavbar from './LeftNavbar';

export default function ChangePassword() {

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const { oldPassword, newPassword, confirmNewPassword } = password;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const OnInputChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }
  const clearForm = () => {
    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const navigate = useNavigate();
  const handleCancel = () => navigate("/home");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (currentUser.password === oldPassword) {
      if (newPassword === confirmNewPassword) {
        const putData = currentUser.userId + "?oldPassword=" + oldPassword + "&newPassword=" + newPassword;
        await axios.put("http://localhost:8080/user/update/" + putData)
          .then(() => {
            currentUser.password = newPassword
            console.log(currentUser.password);
            localStorage.setItem("user", JSON.stringify(currentUser));
            setSuccessMessage('Lozinka je uspješno promijenjena');
            setErrorMessage('');
            clearForm();
          })
          .catch((error) => {
            console.log(error);
          })
      } else {
        setSuccessMessage('');
        setErrorMessage('Lozinka za potvrdu je drugačija. Molimo unesite istu lozinku.');
      }
    } else {
      setSuccessMessage('');
      setErrorMessage('Pogrešno ste unijeli staru lozinku. Provjerite i pokušajte ponovo.');
    }

  };

  return (
    <div className='row'>
      <LeftNavbar />
      <div className='col-md-10 bg-light ' style={{ borderBottomLeftRadius: '10px'}}>
        <h3 className='mt-3 ms-3'><b>Promjeni lozinku</b></h3>

        <form onSubmit={(e) => onSubmit(e)} className='mt-5 change-pass-form'>
          <div className='mb-2 px-4'>
            <label htmlFor='OldPassword' className='form-label'>Stara lozinka:</label>
            <input type='password'
              className='form-control'
              placeholder='Unesite staru lozinku.'
              name='oldPassword'
              value={oldPassword}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='NewPassword' className='form-label'>Nova lozinka:</label>
            <input type='password'
              className='form-control'
              placeholder='Unesite novu lozinku.'
              name='newPassword'
              value={newPassword}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-3 px-4'>
            <label htmlFor='ConfirmNewPassword' className='form-label'>Potvrdite novu lozinku:</label>
            <input type='password'
              className='form-control'
              placeholder='Potvrdite novu lozinku.'
              name='confirmNewPassword'
              value={confirmNewPassword}
              onChange={(e) => OnInputChange(e)} />
          </div>

          <div className='mb-3 px-4'>
            <button type='submit' className='btn btn-primary mb-3 me-3 change-btn' >Sačuvaj</button>
            <button type='cancel' className='btn btn-secondary mb-3 change-btn' onClick={() => handleCancel()}>Otkaži</button>
            {successMessage && <div className="success-message text-center text-success ">{successMessage}</div>}
            {errorMessage && <div className="error-message text-center text-danger">{errorMessage}</div>}
          </div>
        </form>


      </div>
    </div>



  )
}
