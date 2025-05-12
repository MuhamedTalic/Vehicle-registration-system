package com.muhamed.VehicleRegistrationSystem.exception;

public class CarsNotFoundException extends RuntimeException {
    public CarsNotFoundException() {
        super("Vozila nisu pronađena!");
    }
}
