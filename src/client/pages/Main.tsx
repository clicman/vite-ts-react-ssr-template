import { inject, MobXProviderContext, observer } from 'mobx-react';
import { Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react';

import { execInSsrContext, isSsr } from '@client/util/ssrUtils';
import { RootStore } from '@client/stores/rootStore';

import styles from './Main.scss';

const Main: React.FC = observer(() => {
  const { postsStore }: RootStore = React.useContext(MobXProviderContext).store;

  // Executes code in SSR context only. On client - does nothing
  if (isSsr()) execInSsrContext(() => postsStore.loadPosts());

  useEffect(() => {
    postsStore.loadPosts();
  }, [postsStore]);

  const showComments = (e: React.MouseEvent, postId: number) => {
    postsStore.loadPostComments(postId);
  };

  return (
    <>
      <Helmet>
        <title>Main Page</title>
      </Helmet>
      <div id={'page-content'} className={styles.pageContent}>
        {postsStore.posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {post.comments.length ? (
              <div>
                <h3>Comments:</h3>
                {post.comments.map((comment) => (
                  <p key={`comment-${post.id}-${comment.id}`}>{comment.body}</p>
                ))}
              </div>
            ) : (
              <button className={styles.commentButton} onClick={(e) => showComments(e, post.id)}>
                Show comments
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
});

export default inject('store')(Main);
