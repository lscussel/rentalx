import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, brand, category_id} = request.body;

        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);

        const all = await listAvailableCarsUseCase.execute({ name, brand, category_id });

        return response.json(all);
    };
};

export { ListAvailableCarsController };