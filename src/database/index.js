import { Client } from "pg";
import "dotenv/config";

const database = new Client(
  process.env.NODE_ENV === "test"
    ? {
        user: "leo",
        password: "1234",
        database: "db_users_test",
        host: "localhost",
        port: 5432,
      }
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        host: "localhost",
        port: 5432,
      }
);

const startDataBase = async () => {
  await database.connect();
  console.log("DataBase connected!");
};
const users = [];

export { database, startDataBase };

export default users;
