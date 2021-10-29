import { CarsRepositoryInMemony } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemony;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemony();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car Test",
      description: "Description Car Test",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 60,
      brand: "Brand Car Test",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a new car with the same license_plate twice", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car Test",
        description: "Description Car Test",
        daily_rate: 100,
        license_plate: "ABC1234",
        fine_amount: 60,
        brand: "Brand Car Test",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Name Car Test 2",
        description: "Description Car Test 2",
        daily_rate: 100,
        license_plate: "ABC1234",
        fine_amount: 60,
        brand: "Brand Car Test 2",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("The created car need to have the available property set true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car Available",
      description: "Description Car Test",
      daily_rate: 100,
      license_plate: "ABC4321",
      fine_amount: 60,
      brand: "Brand Car Test",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
