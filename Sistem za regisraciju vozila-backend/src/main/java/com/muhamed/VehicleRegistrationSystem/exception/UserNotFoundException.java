package com.muhamed.VehicleRegistrationSystem.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException() {
        super("Korisnik ne može biti pronađen!");
    }
}
