import { makeObservable, observable, runInAction } from 'mobx';
import { plainToClass } from 'class-transformer';
import axios from 'axios';

import Post from '@server/api/model/post';
import clientConfig from '@client/clientConfig';
import { isSsr } from '@client/util/ssrUtils';
import Store from '@client/stores/store';
import PostComment from '@server/api/model/postComment';

export default class PostsStore extends Store {
  @observable
  public posts: Post[] = [];

  constructor(allPromises: Promise<any>[]) {
    super(allPromises);
    makeObservable(this);
  }

  loadPosts() {
    const url = `${clientConfig.apiUrl}/posts`;
    const promise = axios
      .get(url)
      .then((response) => {
        runInAction(() => {
          this.posts = observable(plainToClass(Post, response.data as Object[]));
        });
      })
      // eslint-disable-next-line no-console
      .catch((error) => isSsr() && console.error(error));
    this.addPromise(promise);
  }

  loadPostComments(postId: number) {
    const url = `${clientConfig.apiUrl}/posts/${postId}/comments`;
    const promise = axios
      .get(url)
      .then((response) => {
        runInAction(() => {
          const index = this.posts.findIndex((post) => post.id === postId)!;
          this.posts[index].comments = plainToClass(PostComment, response.data as Object[]);
          this.posts[index] = { ...this.posts[index] };
        });
      })
      // eslint-disable-next-line no-console
      .catch((error) => isSsr() && console.error(error));
    this.addPromise(promise);
  }
}
