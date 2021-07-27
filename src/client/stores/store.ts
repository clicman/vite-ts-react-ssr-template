import { isSsr } from '@client/util/ssrUtils';

export default abstract class Store {
  allPromises: Promise<any>[];

  protected constructor(promises: Promise<any>[]) {
    this.allPromises = promises;
  }

  addPromise(promise: Promise<any>): void {
    if (isSsr()) {
      this.allPromises.push(promise);
    }
  }

  public toState() {
    const state: Record<string, unknown> = {};
    (Object.keys(this) as (keyof Store)[])
      .filter((key) => key !== 'allPromises')
      .forEach((key) => {
        state[key] = this[key];
      });
    return state;
  }
}
