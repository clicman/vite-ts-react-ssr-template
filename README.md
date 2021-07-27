# Vite supercharged Typescript SSR template

Based on https://github.com/jonluca/vite-typescript-ssr-react

### Preconfigured features
* Typescript
* React
* MobX
* SCSS
* SCSS auto types generation
* SCSS media props
* SSR caching
* ESLint
* Prettier
* React Helmet


### Configuration
* use .env file and `src/server/serverConfig.ts` for its mapping.

### Runnging
* dev mode: `yarn/npm dev`
* production mode: `yarn/npm serve`

### Routes
* Routes for client and server defined separately (to support pages lazy-loading on client).
* Client routes placed in `@client/routesClient.ts`
* Server routes are in `@server/routesServer.ts`

So you could load routing from api and configure it programmatically on your way.

### Actions 
* If you want to execute action on client only, use standard `useEffect`
* If you want to execute action on server only, use `execInSsrContext`

#### Example

````
import { execInSsrContext } from '@client/stores/ssrUtils';

const Page: React.FC = () => {
    execInSsrContext(() => console.log("I'm on server only"));
    useEffect(() => { console.log("I'm on client only") }, []);
    
    // Other component code
    ....
};
````

### Store and context

All store management performed via MobX. All new stores should be added as fields in `@client/stores/rootStore.ts` and initialized on declaration.

#### Example
````
import PostsStore from '@client/stores/postsStore';

export class RootStore {
  private allPromises: Promise<any>[] = [];

  postsStore: PostsStore = new PostsStore(this.allPromises);

}
````

All child stores should be extended of `@client/stores/store.ts` class
with a special constructor (see example).

Fields which should be observed should be initialized and after passed into
makeObservable in constructor:

#### Example
````
import { makeObservable, observable, runInAction } from 'mobx';

import Store from '@client/stores/store';

export default class UsersStore extends Store {
  @observable
  public users: string = '';

  constructor(allPromises: Promise<any>[]) {
    super(allPromises);
    makeObservable(this);
  }
  
  loadAction() {
    const url = 'https://reqres.in/api/users?delay=3';
    const promise = axios.get(url).then((data) => {
      runInAction(() => {
        this.users = JSON.stringify(data.data);
      });
    });
    this.addPromise(promise);
  }
}
````

#### SSR caching
There is caching implemented for SSr rendering in production mode. CACHE_EXPIRE_TIME_SECONDS .env property controls caching time.



## License: MIT
