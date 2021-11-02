import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

class CreateCarSpecificationUseCase {
    constructor (
        //@inject("CarsRepository")
        private carsRepository: ICarsRepository,

        private specificationsRepository: ISpecificationsRepository
    ) { }
    
    async execute({ car_id, specifications_id }: IRequest ): Promise<void> {
        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError("Car does not exists!");
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);

        car.specifications = specifications;

        await this.carsRepository.create(car);
    };
}

export { CreateCarSpecificationUseCase };