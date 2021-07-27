import { makeObservable, observable, toJS } from 'mobx';
import { Type } from 'class-transformer';

import PostsStore from '@client/stores/postsStore';
import Store from '@client/stores/store';

export class RootStore {
  private allPromises: Promise<any>[] = [];

  @observable
  @Type(() => PostsStore)
  postsStore: PostsStore = new PostsStore(this.allPromises);

  constructor() {
    makeObservable(this);
  }

  toState(): string {
    const state: Record<string, unknown> = {};
    (Object.keys(this) as (keyof RootStore)[])
      .filter((key) => !['allPromises'].includes(key))
      .forEach((key) => {
        state[key] = (this[key] as Store).toState();
      });
    return JSON.stringify(toJS(state));
  }

  getAllPromises(): Promise<any>[] {
    return this.allPromises;
  }

  clearPromises(): void {
    this.allPromises = [];
  }
}
