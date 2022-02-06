import {parse, Router} from "./deps.ts";

const router = new Router();

const file = await Deno.open("./resources/medication/oddb_product_test.xml");
const {size} = await file.stat();

const startTime = new Date().getTime();
const medication = await parse(file, {
  progress(bytes) {
    console.debug(
        Deno.stdout.writeSync(
            new TextEncoder().encode(
                `Parsing Medication: ${(100 * bytes / size).toFixed(2)}%\r`
            )
        ))
  },
});
const endTime = new Date().getTime();
const diffMs = endTime - startTime;

const seconds = diffMs / 1000;

console.log(`Finished parsing Medications in ${seconds} seconds.`)

router.get("/api/v1/medication", (context) => {
  context.response.body = {
    success: true,
    msg: medication,
  };
});

export default router;