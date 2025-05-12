import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
    })

    const [confirmPassword, setConfirmPassword] = useState('');
    const { firstName, lastName, userName, password } = user;
    const jsonUser = JSON.stringify(user);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const clearForm = () => {
        setUser({
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
        });
      };

    const OnInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            await axios.post("http://localhost:8080/user/add", jsonUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    setSuccessMessage('Uspješno ste se prijavili! Samo naprijed i prijavite se.');
                    setErrorMessage('');
                    clearForm();
                    setConfirmPassword('');
                })
                .catch(() => {
                    setErrorMessage('Ovo korisničko ime se već koristi. Molimo promijenite ga i pokušajte ponovo.');
                    setSuccessMessage('');
                })
        }
        else {
            setErrorMessage('Lozinka za potvrdu je drugačija. Molimo unesite istu lozinku.');
            setSuccessMessage('');
        }
    };
    return (
        <div className="container">
            <form onSubmit={(e) => onSubmit(e)} className='row'>
                <div className='col-md-10 offset-md-1 border rounded p-3 mt-3 mb-2 shadow bg-light'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="https://i.imgur.com/oxpHueC.png" alt="" style={{ width: '200px', height: '200px', borderRadius: '10%',  }} />
                    </div>
                    <h3 className='text-center'>Registruj se</h3>
                    <div className='mb-2 px-4'>
                        <label htmlFor='FirstName' className='form-label'>Ime:</label>
                        <input type='text'
                            className='form-control'
                            placeholder='Unesite svoje ime.'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => OnInputChange(e)} />
                    </div>
                    <div className='mb-2 px-4'>
                        <label htmlFor='LastName' className='form-label'>Prezime</label>
                        <input type='text'
                            className='form-control'
                            placeholder='Unesite svoje prezime.'
                            name='lastName'
                            value={lastName}
                            onChange={(e) => OnInputChange(e)} />
                    </div>
                    <div className='mb-2 px-4'>
                        <label htmlFor='Username' className='form-label'>Korisničko ime:</label>
                        <input type='text'
                            className='form-control'
                            placeholder='Unesite svoje korisničko ime.'
                            name='userName'
                            value={userName}
                            onChange={(e) => OnInputChange(e)} />
                    </div>
                    <div className='mb-2 px-4'>
                        <label htmlFor='Password' className='form-label'>Lozinka:</label>
                        <input type='password'
                            className='form-control'
                            placeholder='Postavite lozinku.'
                            name='password'
                            value={password}
                            onChange={(e) => OnInputChange(e)} />
                    </div>
                    <div className='mb-3 px-4'>
                        <label htmlFor='ConfirmPassword' className='form-label'>Potvrdite lozinku:</label>
                        <input type='password'
                            className='form-control'
                            placeholder='Potvrdite lozinku.'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className='mb-3 px-4'>
                        <button type='submit' className='btn btn-primary custom-btn mb-3' >Registruj se</button>
                        {successMessage && <div className="success-message text-center text-success ">{successMessage}</div>}
                        {errorMessage && <div className="error-message text-center text-danger">{errorMessage}</div>}
                    </div>

                    <Link to="/login" className='text-decoration-none custom-btn'>Već imaš profil? Prijavi se.</Link>
                    
                </div>
            </form>
        </div>
    )

}

