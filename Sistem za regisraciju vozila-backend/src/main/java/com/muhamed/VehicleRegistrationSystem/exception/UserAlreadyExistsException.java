package com.muhamed.VehicleRegistrationSystem.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String userName) {
        super("Korisnik sa ovim korisničkim imenom " + userName + " već postoji.");
    }
}
