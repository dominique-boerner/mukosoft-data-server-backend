import {Application} from "./deps.ts";
import router from "./router.ts";
import DsddbService from "./services/dsddb-service.ts";

console.debug("**** Application Start ****");

const application = new Application();
const host = "localhost";
const port = "9000";

console.debug("**** Loading stores ... ****");

const dsdbbService = new DsddbService();
await dsdbbService.getRecipeStore().load().then(() => console.debug("Recipe store loaded"));
await dsdbbService.getMedicationStore().load().then(() => console.debug("Medication store loaded"));

application.use(router.routes());
application.listen(`${host}:${port}`);

console.debug(`**** Server ist listening on ${host}:${port} ****`);
