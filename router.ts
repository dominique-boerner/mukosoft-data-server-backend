import {oakCors, Router} from "./deps.ts";
import Medication from "./api/v1/medication.ts";

const router = new Router();

console.debug("**** Parsing data ... ****");

const medication = new Medication()
await medication.parseFile();

router.get("/api/v1/medication", oakCors(), (context) => {
  context.response.body = {
    success: true,
    // @ts-ignore
    data: medication["medication"]["PRODUCT"]["PRD"],
  };
});

export default router;