import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory);
    });

    it("Should not be able to add a specification to a non existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];
    
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car Test",
            description: "Description Car Test",
            daily_rate: 100,
            license_plate: "ABC1234",
            fine_amount: 60,
            brand: "Brand Car Test",
            category_id: "category",
        });

        const specifications_id = ["54321"];

        await createCarSpecificationUseCase.execute({ car_id: car.id , specifications_id });
    });

});