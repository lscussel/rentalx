import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemony";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let dateProvider: DayjsDateProvider;

describe("Sendo Forgot Mail", () => {
   beforeEach(() => {
      usersRepositoryInMemory = new UsersRepositoryInMemory();
      usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
      mailProviderInMemory = new MailProviderInMemory();
      dateProvider = new DayjsDateProvider();
      sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
         usersRepositoryInMemory,
         usersTokensRepositoryInMemory,
         dateProvider,
         mailProviderInMemory
      );
   });

   it("Should be able to send a forgot password mail to user", async () => {
      const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
      
      await usersRepositoryInMemory.create({
         driver_license: "888888",
         email: "teste@analisesparanegocios.com.br",
         name: "Teste",
         password: "123456"
      });

      await sendForgotPasswordMailUseCase.execute("teste@analisesparanegocios.com.br");

      expect(sendMail).toHaveBeenCalled();
   });

   it("Should not be able to send an email if user does not exists", async () => {
      await expect(
         sendForgotPasswordMailUseCase.execute("unknown@analisesparanegocios.com.br")
      ).rejects.toEqual(new AppError("User does not exists"));
   });

   it("Should be able to create an users token", async () => {
      const gerenateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

      await usersRepositoryInMemory.create({
         driver_license: "888888",
         email: "teste@analisesparanegocios.com.br",
         name: "Teste",
         password: "123456"
      });

      await sendForgotPasswordMailUseCase.execute("teste@analisesparanegocios.com.br");

      expect(gerenateTokenMail).toBeCalled();
   });
 })