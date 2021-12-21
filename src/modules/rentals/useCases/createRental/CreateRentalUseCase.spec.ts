import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";

let dayjsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(async () => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new Rental", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car Test",
            description: "Description Car Test",
            daily_rate: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            brand: "Brand Car Test",
            category_id: "category",
        });
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

    });

    // it("Should not be able to create a new Rental for a user who has a rental in progress", async () => {
    //     expect(async () => {
    //         await createRentalUseCase.execute({
    //             user_id: "12345",
    //             car_id: "121212",
    //             expected_return_date: dayAdd24Hours
    //         });
    
    //         await createRentalUseCase.execute({
    //             user_id: "12345",
    //             car_id: "23232323",
    //             expected_return_date: dayAdd24Hours
    //         });
    //     }).rejects.toBeInstanceOf(AppError)
    // });

    // it("Should not be able to create a new Rental for a car rented at the same time", async () => {
    //     expect(async () => {
    //         await createRentalUseCase.execute({
    //             user_id: "12345",
    //             car_id: "121212",
    //             expected_return_date: dayAdd24Hours
    //         });
    
    //         await createRentalUseCase.execute({
    //             user_id: "54321",
    //             car_id: "121212",
    //             expected_return_date: dayAdd24Hours
    //         });
    //     }).rejects.toBeInstanceOf(AppError)
    // });

    // it("Should not be able to rent a car with an expected returning date less than 24 hours from the start of the rental", async () => {
    //     expect(async () => {
    //         await createRentalUseCase.execute({
    //             user_id: "12345",
    //             car_id: "121212",
    //             expected_return_date: dayjs().toDate()
    //         });
    //     }).rejects.toBeInstanceOf(AppError);
    // });
});