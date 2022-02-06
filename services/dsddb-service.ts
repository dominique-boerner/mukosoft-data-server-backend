import {DsDDB} from "../deps.ts";
import {Recipe} from "../interfaces/recipe.ts";
import {Medication} from "../interfaces/medication.ts";

/**
 * Service for handling crud operations in dsddb stores.
 *
 * @see https://github.com/MaximilianHeidenreich/DsDDB
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class DsddbService {

  private recipeStoreUrl = "./store/recipe.store.json";
  private medicationStoreUrl = "./store/medication.store.json";

  private recipeStore: DsDDB<Recipe> = new DsDDB<Recipe>(this.recipeStoreUrl);
  private medicationStore: DsDDB<Medication> = new DsDDB<Medication>(this.medicationStoreUrl);

  getMedicationStore(): DsDDB<Medication> {
    return this.medicationStore;
  }

  getRecipeStore(): DsDDB<Recipe> {
    return this.recipeStore;
  }

  async add(store: DsDDB<Recipe> | DsDDB<Medication>, key: string, value: Recipe | Medication) {
    // @ts-ignore
    switch (store.storePath) {
      case this.medicationStoreUrl: {
        this.medicationStore.set(key, value as Medication, false);
        await this.medicationStore.write();
        break;
      }
      case this.recipeStoreUrl: {
        this.recipeStore.set(key, value as Recipe, false);
        await this.recipeStore.write();
        break;
      }
      default: {
        console.error("Store is not supported");
        break;
      }
    }
  }

  async remove(store: DsDDB<Recipe> | DsDDB<Medication>, key: string) {

  }
}
