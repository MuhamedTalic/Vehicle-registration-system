package com.muhamed.VehicleRegistrationSystem.service;

import java.util.List;

import com.muhamed.VehicleRegistrationSystem.model.Car;

public interface ICarService {
    List<Car> getCars();

    void addCar(Car car);

    void deleteCar(Long carId);

    void updateCar(Long carId, String carName, String brand, String model, Integer year, String numberPlate);

    List<Car> getCarsByModelOrBrand(String searchWord);

    List<Car> getCarsByUserId(Long userId);
}
