import {Application} from "./deps.ts";
import router from "./router.ts";
import DsddbService from "./services/dsddb-service.ts";

const application = new Application();
const host = "localhost";
const port = "9000";

const dsdbbService = new DsddbService();
await dsdbbService.getRecipeStore().load().then(() => console.debug("Recipe store loaded"));
await dsdbbService.getMedicationStore().load().then(() => console.debug("Medication store loaded"));

dsdbbService.add(dsdbbService.getRecipeStore(), "test234", { name: "asd"}).then((r) => console.log(r));

application.use(router.routes());
application.listen(`${host}:${port}`);
