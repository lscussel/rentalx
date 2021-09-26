import { Specification } from "../model/Specification";

interface ISpecificationDTO {
    name: string;
    description: string;
};

interface ISpecificationsRepository {
    create({ name, description}: ISpecificationDTO): void;
    list(): Specification[];
    findByName(name: string): Specification;
};

export { ISpecificationDTO, ISpecificationsRepository };