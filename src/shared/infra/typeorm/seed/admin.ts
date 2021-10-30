import { hash } from "bcrypt";
import { v4 as uudiV4 } from "uuid";

import createConnection from "../index"

async function create() {
    const connection = await createConnection("localhost");

    const id = uudiV4();
    const password = await hash("admin", 8)

    await connection.query(
        `INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at) 
            VALUES ('${id}', 'admin', 'admin@analisesparanegocios.com.br', '${password}', true, '888888', 'now()')`
    );

    await connection.close();
}

create().then(() => console.log("user admin created!"));