import {Router} from "./deps.ts";
import Medication from "./api/v1/medication.ts";

const router = new Router();

console.debug("**** Parsing data ... ****");

const medication = await new Medication();
medication.parseFile();

router.get("/api/v1/medication", (context) => {
  context.response.body = {
    success: true,
    msg: medication,
  };
});

export default router;