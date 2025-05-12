import React from 'react';
import LeftNavbar from './LeftNavbar';

export default function EditCar({car}) {

  console.log("*****" + typeof car);

  return (
    <div className='row'>
      <LeftNavbar />
      <div className='col-md-10 bg-light 'style={{ borderBottomLeftRadius: '10px'}}>
        <h3 className='mt-3 ms-3'><b>Uredi vozilo</b></h3>
      <p>{car}</p>
      <form className='mt-5'>
          <div className='mb-2 px-4'>
            <label htmlFor='CarName' className='form-label'>Ime vozila:</label>
            <input type='text'
              className='form-control'
              placeholder='Unesite ime vozila.'
              name='carName' />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='Brand' className='form-label'>Brend:</label>
            <input type='text'
              className='form-control'
              placeholder="Unesite brend vozila."
              name='brand' />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='Model' className='form-label'>Model:</label>
            <input type='text'
              className='form-control'
              placeholder="Unesite model vozila."
              name='model' />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='Year' className='form-label'>Godina proizvodnje:</label>
            <input type='text'
              className='form-control'
              placeholder="Unesite godinu proizvodnje vozila."
              name='year' />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='NumberPlate' className='form-label'>Broj tablice:</label>
            <input type='text'
              className='form-control'
              placeholder="Unesite broj tablice vozila."
              name='numberPlate' />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='CarOwner' className='form-label'>Vlasnik vozila:</label>
            <input type='text'
              className='form-control'
              placeholder="Unesite vlasnika vozila."
              name='carOwner' />
          </div>
          <div className='mb-3 px-4'>
            <button type='submit' className='btn btn-primary mb-3 me-3 change-btn' >Sačuvaj</button>
            <button type='cancel' className='btn btn-secondary mb-3 change-btn' >Otkaži</button>
          </div>
        </form>




      </div>
    </div>
  )
}
