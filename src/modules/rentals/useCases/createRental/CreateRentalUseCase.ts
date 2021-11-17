import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { AppError } from "@shared/errors/AppError";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({
        user_id,
        car_id,
        expected_return_date
    }: IRequest): Promise<Rental> {
        const minimumCarRentalPeriodInHours = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car is not available");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There is a rental in progress for user!");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if (compare < minimumCarRentalPeriodInHours) {
            throw new AppError("Invalid expeted returning date! Minimum of 24 Hous");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        return rental;
    };
}

export { CreateRentalUseCase };