import { plainToClass } from 'class-transformer';

import { RootStore } from '@client/stores/rootStore';

/**
 Rehydrate (on client)
 */
export function rehydrate(): RootStore {
  // eslint-disable-next-line no-underscore-dangle
  const store = plainToClass(RootStore, (window as any).__STATE);
  // eslint-disable-next-line no-underscore-dangle
  delete (window as any).__STATE;
  const script = document.getElementById('__mobxState');

  script?.parentNode?.removeChild(script);

  return store;
}
