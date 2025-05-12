import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftNavbar from './LeftNavbar';

export default function AddNewCar() {

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [car, setCar] = useState({
    carName: "",
    brand: "",
    model: "",
    year: "",
    numberPlate: "",
    user: currentUser,
  })

  const { carName, brand, model, year, numberPlate } = car;
  const jsonCar = JSON.stringify(car);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearForm = () => {
    setCar({
      carName: "",
      brand: "",
      model: "",
      year: "",
      numberPlate: "",
    });
  };

  const OnInputChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();
  const handleCancel = () => navigate("/home");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/car/add", jsonCar, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setSuccessMessage('Vozilo je uspješno dodano.');
        setErrorMessage('');
        clearForm();
      })
      .catch((error) => {
        setErrorMessage("Ovaj broj tablice se već koristi. Ne možete ga dodati.");
        setSuccessMessage('');
      })
  };



  return (
    <div className='row'>
      <LeftNavbar />
      <div className='col-md-10 bg-light '>
        <h3 className='mt-3 ms-3'><b>Dodaj novo vozilo</b></h3>

        <form onSubmit={(e) => onSubmit(e)} className='mt-5'>
          <div className='mb-2 px-4'>
            <label htmlFor='CarName' className='form-label'>Ime vozila:</label>
            <input type='text'
              className='form-control'
              placeholder='Unesite ime vozila.'
              name='carName'
              value={carName}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='Brand' className='form-label'>Brend:</label>
            <input type='text'
              className='form-control'
              placeholder="Unesite brend vozila."
              name='brand'
              value={brand}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='Model' className='form-label'>Model:</label>
            <input type='text'
              className='form-control'
              placeholder="Unesite model vozila."
              name='model'
              value={model}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='Year' className='form-label'>Godina proizvodnje:</label>
            <input type='text'
              className='form-control'
              placeholder="Unesite godinu proizvodnje vozila."
              name='year'
              value={year}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='NumberPlate' className='form-label'>Broj tablice:</label>
            <input type='text'
              className='form-control'
              placeholder="Unesite broj tablice vozila."
              name='numberPlate'
              value={numberPlate}
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
