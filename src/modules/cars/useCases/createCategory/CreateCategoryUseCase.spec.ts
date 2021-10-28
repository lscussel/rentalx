import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemony } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemony;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemony();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("sould be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        
        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be to create a category that already exists", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category Description Test"
            }
            
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});