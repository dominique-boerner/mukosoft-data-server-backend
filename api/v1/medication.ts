import {parse} from "../../deps.ts";

export default class Medication {

  private filePath = "./resources/medication/oddb_product_test.xml";
  private medication: any;

  async parseFile() {
    const file = await Deno.open(this.filePath);
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

    console.debug(`Finished parsing Medications in ${seconds} seconds.`);
    this.medication = medication;
  }
}