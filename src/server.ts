import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";
import seedSuperAdmin from "./app/DB";
const port = 3000;

async function main() {
  await mongoose.connect(config.mongoose_url as string);
  app.listen(config, () => {
    seedSuperAdmin();
    console.log(`Example app listening on port ${config.port}`);
  });
}

main();
