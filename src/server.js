import app from "./app";
import "dotenv/config";

app.listen(process.env.PORT, () =>
  console.log(`App rodando na localhost:${process.env.PORT}`)
);
