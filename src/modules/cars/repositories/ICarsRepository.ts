import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findById(id: string): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    list(): Promise<Car[]>;
    listAvailables(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]>;
};

export { ICarsRepository };