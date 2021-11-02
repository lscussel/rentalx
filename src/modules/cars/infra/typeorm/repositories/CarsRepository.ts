import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }
    
    async create({ 
        name, 
        description, 
        daily_rate, 
        license_plate, 
        fine_amount, 
        brand,
        category_id,
        specifications
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications
        });

        await this.repository.save(car);

        return car;
    }


    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne({ id });

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }

    async list(): Promise<Car[]> {
        const cars = await this.repository.find();

        return cars;
    }

    async listAvailables(
        name: string,
        brand: string,
        category_id: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository.createQueryBuilder("c")
            .where("available = :available", { available: true});

        if (name) {
            carsQuery.andWhere("c.name = :name", { name });
        }

        if (brand) {
            carsQuery.andWhere("c.brand = :brand", { brand });
        }

        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id });
        }

        const cars = carsQuery.getMany();

        return cars;
    }

}

export { CarsRepository };