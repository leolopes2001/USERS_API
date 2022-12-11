import { app } from "./app";
import { startDataBase } from "./database";
import "dotenv/config";

app.listen(process.env.PORT, async () => {
  await startDataBase();
  console.log(`App rodando na localhost:${process.env.PORT}`);
});
