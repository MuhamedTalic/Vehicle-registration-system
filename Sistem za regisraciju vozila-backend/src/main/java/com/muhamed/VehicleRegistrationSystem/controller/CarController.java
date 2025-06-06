package com.muhamed.VehicleRegistrationSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.muhamed.VehicleRegistrationSystem.model.Car;
import com.muhamed.VehicleRegistrationSystem.service.CarServiceImpl;

@RestController
@RequestMapping(path = "car")
public class CarController {

    private final CarServiceImpl carService;

    @Autowired
    public CarController(CarServiceImpl carService) {
        this.carService = carService;
    }

    @GetMapping(path = "/all")
    public List<Car> getCars() {
        return carService.getCars();
    }

    @GetMapping(path = "/getByModelOrBrand/{searchWord}")
    public List<Car> getCarsByModelOrBrand(@PathVariable("searchWord") String searchWord) {
        return carService.getCarsByModelOrBrand(searchWord);
    }

    @GetMapping(path = "/getByUserId/{userId}")
    public List<Car> getCarsByUserId(@PathVariable("userId") Long userId) {
        return carService.getCarsByUserId(userId);
    }

    @GetMapping(path = "/getByUserId/count/{userId}")
    public Integer getCarsCountByUserId(@PathVariable("userId") Long userId) {
        return carService.getCarsCountByUserId(userId);
    }

    @PostMapping(path = "/add")
    public void addCar(@RequestBody Car car) {
        carService.addCar(car);
    }

    @DeleteMapping(path = "/delete/{carId}")
    public void deleteCar(@PathVariable("carId") Long carId) {
        carService.deleteCar(carId);
    }

    @PutMapping(path = "/update/{carId}")
    public void updateCar(@PathVariable("carId") Long carId,
            @RequestParam(required = false) String carName,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String numberPlate) {
        carService.updateCar(carId, carName, brand, model, year, numberPlate);
    }

}
