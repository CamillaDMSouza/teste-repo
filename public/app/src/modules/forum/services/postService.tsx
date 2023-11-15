import { APIResponse } from '../../../shared/infra/services/APIResponse';
import { PostType, Post } from '../models/Post';
import { BaseAPI } from '../../../shared/infra/services/BaseAPI';
import { IAuthService } from '../../users/services/authService';
import { Result } from '../../../shared/core/Result';
import { right, left } from '../../../shared/core/Either';
import { PostUtil } from '../utils/PostUtil';
import { PostDTO } from '../dtos/postDTO';

export interface IPostService {
  createPost(
    title: string,
    type: PostType,
    text?: string,
    link?: string
  ): Promise<APIResponse<void>>;
  getRecentPosts(offset?: number): Promise<APIResponse<Post[]>>;
  getPostsByDate(date?: Date): Promise<APIResponse<Post[]>>;
  getAveragePostsByDate(date?: Date): Promise<APIResponse<Number>>;
  getAscendingPosts(offset?: number): Promise<APIResponse<Post[]>>;
  getPopularPosts(offset?: number): Promise<APIResponse<Post[]>>;
  getPostBySlug(slug: string): Promise<APIResponse<Post>>;
  upvotePost(slug: string): Promise<APIResponse<void>>;
  downvotePost(slug: string): Promise<APIResponse<void>>;
  getAscendingPosts(offset?: number): Promise<APIResponse<Post[]>>;
  fetchMemberPostCount(username: string): Promise<APIResponse<number>>;
  fetchMemberCommentCount(username: string): Promise<APIResponse<number>>;
  getHourWiththeMostPostsCreatedInaDay(
    data?: Date
  ): Promise<APIResponse<number>>;
  getPercentageOfPostsWithoutCommentsByDate(
    date?: Date | string
  ): Promise<APIResponse<number>>;
}

export class PostService extends BaseAPI implements IPostService {
  constructor(authService: IAuthService) {
    super(authService);
  }

  public async getPostBySlug(slug: string): Promise<APIResponse<Post>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        '/posts',
        { slug },
        isAuthenticated ? auth : null
      );

      return right(Result.ok<Post>(PostUtil.toViewModel(response.data.post)));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async getRecentPosts(offset?: number): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        '/posts/recent',
        { offset },
        isAuthenticated ? auth : null
      );

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async getPostsByDate(
    date?: Date | string
  ): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        `/posts/specificDay`,
        { date },
        isAuthenticated ? auth : null
      );

      console.log(response.data.posts);

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async getAveragePostsByDate(
    date?: Date | string
  ): Promise<APIResponse<Number>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        `/posts/averageposts`,
        { day: date },
        isAuthenticated ? auth : null
      );

      //console.log('average', response.data.average);

      return right(Result.ok<Number>(response.data.average));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async getPercentageOfPostsWithoutCommentsByDate(
    date?: Date | string
  ): Promise<APIResponse<number>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        `/posts/PercentageOfPostsWithoutComments`,
        { date },
        isAuthenticated ? auth : null
      );

      console.log(response.data.percentage);

      return right(Result.ok<number>(response.data.percentage));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }
  public async getHourWiththeMostPostsCreatedInaDay(
    date?: Date | string
  ): Promise<APIResponse<number>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        `/posts/getHourWiththeMostPostsCreatedInaDay`,
        { date },
        isAuthenticated ? auth : null
      );

      console.log(response.data.hour);

      return right(Result.ok<number>(response.data.hour));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async getAscendingPosts(
    offset?: number
  ): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };

      const response = await this.get(
        '/posts/allascending',
        { offset },
        isAuthenticated ? auth : null
      );

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async getPopularPosts(offset?: number): Promise<APIResponse<Post[]>> {
    try {
      const accessToken = this.authService.getToken('access-token');
      const isAuthenticated = !!accessToken === true;
      const auth = {
        authorization: accessToken
      };
      const response = await this.get(
        '/posts/popular',
        { offset },
        isAuthenticated ? auth : null
      );

      return right(
        Result.ok<Post[]>(
          response.data.posts.map((p: PostDTO) => PostUtil.toViewModel(p))
        )
      );
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  public async createPost(
    title: string,
    type: PostType,
    text?: string,
    link?: string
  ): Promise<APIResponse<void>> {
    try {
      await this.post('/posts', { title, postType: type, text, link }, null, {
        authorization: this.authService.getToken('access-token')
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async upvotePost(slug: string): Promise<APIResponse<void>> {
    try {
      await this.post('/posts/upvote', { slug }, null, {
        authorization: this.authService.getToken('access-token')
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async downvotePost(slug: string): Promise<APIResponse<void>> {
    try {
      await this.post('/posts/downvote', { slug }, null, {
        authorization: this.authService.getToken('access-token')
      });
      return right(Result.ok<void>());
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async fetchMemberPostCount(username: string): Promise<APIResponse<number>> {
    try {
      const response = await this.get(`/postcount/${username}`);
      return right(Result.ok<number>(response.data.memberPostCount));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }

  async fetchMemberCommentCount(
    username: string
  ): Promise<APIResponse<number>> {
    try {
      const response = await this.get(`/commentcount/${username}`);
      return right(Result.ok<number>(response.data.memberCommentCount));
    } catch (err) {
      return left(
        err.response ? err.response.data.message : 'Connection failed'
      );
    }
  }
}
