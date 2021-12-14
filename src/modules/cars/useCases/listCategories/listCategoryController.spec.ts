import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Category Controller",() => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8)

        await connection.query(
            `INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at) 
            VALUES ('${id}', 'admin', 'admin@analisesparanegocios.com.br', '${password}', true, '888888', 'now()')`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions")
        .send({
            email: "admin@analisesparanegocios.com.br",
            password: "admin"
        });

        const { token } = responseToken.body;

        await request(app).post("/categories")
        .send({
            name: "Category Supertest",
            description: "Category Supertest description"
        })
        .set({
            Authorization: `Bearer ${token}`
        });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category Supertest");
    });
})