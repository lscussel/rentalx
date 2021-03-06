import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) { };

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExits = await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExits) {
            throw new AppError("Specification already exists");
        }

        await this.specificationsRepository.create({ name, description });
    };
};

export { CreateSpecificationUseCase };