import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemony";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);


    });

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            email: "user@test.com",
            password: "123456",
            driver_license: "123456"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate a non existent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "123456"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    
    it("Should not be able to authenticate with incorret password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test",
                email: "user@test.com",
                password: "123456",
                driver_license: "123456"
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });


});