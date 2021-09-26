import { Router } from "express";
import { createSpecificationController } from  "../modules/cars/useCases/createSpecification";
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';


const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
    const all = specificationsRepository.list();

    return response.json(all);
});

export { specificationsRoutes };