import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    })

    it("Sould be able to list all available cars", async () => {
        const car = await carsRepository.create({
            "name": "Car Test 1",
            "description" : "Car Description",
            "daily_rate" : 110,
            "license_plate" : "ABC1234",
            "fine_amount" : 40,
            "brand" : "car_brand",
            "category_id" : "category_id" 
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    })

    it("Sould be able to list all available car by name", async () => {
        const car = await carsRepository.create({
            "name": "Car Test 1",
            "description" : "Car Description",
            "daily_rate" : 110,
            "license_plate" : "ABC1234",
            "fine_amount" : 40,
            "brand" : "car_brand_test",
            "category_id" : "category_id" 
        });

        const cars = await listAvailableCarsUseCase.execute({ name: "Car Test 1" });

        expect(cars).toEqual([car]);
    })

    it("Sould be able to list all available car by name", async () => {
        const car = await carsRepository.create({
            "name": "Car Test 1",
            "description" : "Car Description",
            "daily_rate" : 110,
            "license_plate" : "ABC1234",
            "fine_amount" : 40,
            "brand" : "car_brand_test",
            "category_id" : "category_id" 
        });

        const cars = await listAvailableCarsUseCase.execute({ brand: "car_brand_test" });

        expect(cars).toEqual([car]);
    })

    it("Sould be able to list all available car by name", async () => {
        const car = await carsRepository.create({
            "name": "Car Test 1",
            "description" : "Car Description",
            "daily_rate" : 110,
            "license_plate" : "ABC1234",
            "fine_amount" : 40,
            "brand" : "car_brand_test",
            "category_id" : "category_id" 
        });

        const cars = await listAvailableCarsUseCase.execute({ category_id: "category_id" });

        expect(cars).toEqual([car]);
    })


 })