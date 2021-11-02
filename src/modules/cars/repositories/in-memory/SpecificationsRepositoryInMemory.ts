import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({ name, description }: ISpecificationDTO): Promise<void> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        });

        this.specifications.push(specification);
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((specification) => specification.name === name);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter(
            (Specification) => ids.includes(Specification.id)
        );

        return allSpecifications;
    }

}

export { SpecificationsRepositoryInMemory };