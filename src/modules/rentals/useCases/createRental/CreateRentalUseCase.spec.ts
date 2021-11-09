import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it("Should be able to create a new Rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: new Date()
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");

    });

    it("Should not be able to create a new Rental for a user who has a rental in progress", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: new Date()
            });
    
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "23232323",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("Should not be able to create a new Rental for a car rented at the same time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: new Date()
            });
    
            await createRentalUseCase.execute({
                user_id: "54321",
                car_id: "121212",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError)
    });
})