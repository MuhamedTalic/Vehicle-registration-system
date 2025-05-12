import { faHouse, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LeftNavbar() {
    return (
        <div className='col-md-2 align-self-start  mt-3'>
            <div className='text-center'>
                <img src="https://i.imgur.com/oxpHueC.png" alt="" style={{ width: '200px', height: '200px', borderRadius: '10%' }} />
            </div>
            <ul className="list-group list-group-flush text-left p-2">
                <li className="list-group-item list-group-item-action" style={{ borderRadius: '10px',marginBottom: '20px' }}><Link to={"/home"} className='text-decoration-none text-dark d-flex align-items-center'><FontAwesomeIcon icon={faHouse} className='text-black'/> Početna</Link></li>
                <li className="list-group-item list-group-item-action" style={{ borderRadius: '10px' }}><Link to={"/changePassword"} className='text-decoration-none text-dark d-flex align-items-center'><FontAwesomeIcon icon={faPenToSquare} /> Promjeni lozinku</Link></li>
            </ul>
        </div>


    )
}
