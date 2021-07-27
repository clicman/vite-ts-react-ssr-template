import PostComment from './postComment';

export default class Post {
  public userId: number = -1;

  public id: number = -1;

  public title: string = '';

  public body: string = '';

  public comments: PostComment[] = [];
}
