package com.muhamed.VehicleRegistrationSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muhamed.VehicleRegistrationSystem.exception.CarsNotFoundException;
import com.muhamed.VehicleRegistrationSystem.model.Car;
import com.muhamed.VehicleRegistrationSystem.repository.CarRepository;

import jakarta.transaction.Transactional;

@Service
public class CarServiceImpl implements ICarService {

    private final CarRepository carRepository;

    @Autowired
    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public List<Car> getCars() {
        return carRepository.findAll();
    }

    @Override
    public void addCar(Car car) {
        Optional<Car> carOptional = carRepository.findCarByNumberPlate(car.getNumberPlate());
        if (carOptional.isPresent()) {
            throw new IllegalStateException("Ovaj broj tablice je već registrovan.");
        }
        carRepository.save(car);
    }

    @Override
    public void deleteCar(Long carId) {
        boolean exists = carRepository.existsById(carId);
        if (!exists) {
            throw new IllegalStateException("Vozilo koje ima id " + carId + " ne postoji.");
        }
        carRepository.deleteById(carId);
    }

    @Override
    @Transactional
    public void updateCar(Long carId, String carName, String brand, String model, Integer year, String numberPlate) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalStateException("Vozilo koje ima id " + carId + " ne postoji."));

        if (carName != null && carName != car.getCarName()) {
            car.setCarName(carName);
        }

        if (brand != null && brand != car.getBrand()) {
            car.setBrand(brand);
        }

        if (model != null && model != car.getModel()) {
            car.setModel(model);
        }

        if (year != null && year >= 1750 && year <= 2023 && year != car.getYear()) {
            car.setYear(year);
        }

        if (numberPlate != null && numberPlate != car.getNumberPlate()) {
            Optional<Car> carOptional = carRepository.findCarByNumberPlate(numberPlate);
            if (carOptional.isPresent()) {
                throw new IllegalStateException("Ovaj broj tablice je već registrovan.");
            } else {
                car.setNumberPlate(numberPlate);
            }
        }
    }

    @Override
    public List<Car> getCarsByModelOrBrand(String searchWord) {
        List<Car> cars = carRepository.findCarsByModelOrBrand(searchWord);
        if (cars.isEmpty()) {
            throw new IllegalStateException("Ne postoji takav brend ili model");
        }
        return cars;
    }

    public List<Car> getCarsByUserId(Long userId) {
        List<Car> cars = carRepository.findCarsByUserId(userId);
        if (cars.isEmpty()) {
            throw new CarsNotFoundException();
        }
        return cars;
    }

    public Integer getCarsCountByUserId(Long userId) {
        List<Car> cars = carRepository.findCarsByUserId(userId);
        if (cars.isEmpty()) {
            return 0;
        }
        return cars.size();
    }
}
