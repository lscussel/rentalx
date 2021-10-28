import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import { 
    ICreateCategoryDTO, 
    ICategoriesRepository 
} from "../../../repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    private static INSTANCE: CategoriesRepository;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category)
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });

        return category;
    }

    async list(): Promise<Category[]> {
        const category = await this.repository.find();

        return category;
    }
};

export { CategoriesRepository };