import { IPostRepo } from "../postRepo";
import { PostId } from "../../domain/postId";
import { Post } from "../../domain/post";
import { PostMap } from "../../mappers/postMap";
import { PostDetails } from "../../domain/postDetails";
import { PostDetailsMap } from "../../mappers/postDetailsMap";
import { ICommentRepo } from "../commentRepo";
import { IPostVotesRepo } from "../postVotesRepo";
import { PostVotes } from "../../domain/postVotes";
import { MemberId } from "../../domain/memberId";
import { Comments } from "../../domain/comments";
import { IMemberRepo } from "../memberRepo";
import { Member } from "../../domain/member";
import { IUserRepo } from "../../../users/repos/userRepo";
const { Op } = require("sequelize");

export class PostRepo implements IPostRepo {
  private models: any;
  private commentRepo: ICommentRepo;
  private postVotesRepo: IPostVotesRepo;

  constructor(
    models: any,
    commentRepo: ICommentRepo,
    postVotesRepo: IPostVotesRepo
  ) {
    this.models = models;
    this.commentRepo = commentRepo;
    this.postVotesRepo = postVotesRepo;
  }

  private createBaseQuery(): any {
    const models = this.models;
    return {
      where: {},
      include: []
    };
  }

  private createBaseDetailsQuery(): any {
    const models = this.models;
    return {
      where: {},
      include: [
        {
          model: models.Member,
          as: "Member",
          include: [{ model: models.BaseUser, as: "BaseUser" }]
        }
      ],
      limit: 15,
      offset: 0
    };
  }

  private createBaseDetailsQueryWithoutLimit(): any {
    const models = this.models;
    return {
      where: {},
      include: [
        {
          model: models.Member,
          as: "Member",
          include: [{ model: models.BaseUser, as: "BaseUser" }]
        }
      ],
      offset: 0
    };
  }

  private createQueryWithFilterByDay(day: Date): any {
    const models = this.models;

    var endDate = new Date(day);
    endDate.setHours(endDate.getHours() + 24);

    return {
      where: {
        created_at: {
          [Op.gte]: day,
          [Op.lt]: endDate
        }
      },
      include: [
        {
          model: models.Member,
          as: "Member",
          include: [{ model: models.BaseUser, as: "BaseUser" }]
        }
      ],
      offset: 0
    };
  }

  public async getPostByPostId(postId: PostId | string): Promise<Post> {
    postId = postId instanceof PostId ? (<PostId>postId).id.toString() : postId;
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["post_id"] = postId;
    const post = await PostModel.findOne(detailsQuery);
    const found = !!post === true;
    if (!found) throw new Error("Post not found");
    return PostMap.toDomain(post);
  }

  public async getNumberOfCommentsByPostId(
    postId: PostId | string
  ): Promise<number> {
    postId = postId instanceof PostId ? (<PostId>postId).id.toString() : postId;

    const result = await this.models.sequelize.query(
      `SELECT COUNT(*) FROM comment WHERE post_id = "${postId}";`
    );
    const count = result[0][0]["COUNT(*)"];
    return count;
  }

  public async getPostDetailsBySlug(
    slug: string,
    offset?: number
  ): Promise<PostDetails> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.where["slug"] = slug;
    const post = await PostModel.findOne(detailsQuery);
    const found = !!post === true;
    if (!found) throw new Error("Post not found");
    return PostDetailsMap.toDomain(post);
  }

  public async getRecentPosts(offset?: number): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.offset = offset ? offset : detailsQuery.offset;

    const posts = await PostModel.findAll(detailsQuery);
    return posts.map((p) => PostDetailsMap.toDomain(p));
  }

  public async getPostsByDate(date?: Date): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createQueryWithFilterByDay(date);
    const posts = await PostModel.findAll(detailsQuery);
    return posts.map((p) => PostDetailsMap.toDomain(p));
  }

  public async getPopularPosts(offset?: number): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.offset = offset ? offset : detailsQuery.offset;
    detailsQuery["order"] = [["points", "DESC"]];

    const posts = await PostModel.findAll(detailsQuery);
    return posts.map((p) => PostDetailsMap.toDomain(p));
  }

  /**
   * Gets all posts sorted by points and creation date ascending from the database.
   *
   * The posts are sorted by points ascending and then by creation date ascending too.
   *
   * @returns the all posts ascending in a form of `PostsDetails[]`.
   */
  public async getAllPostsAscending(): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQueryWithoutLimit();
    detailsQuery["order"] = [
      ["points", "ASC"],
      ["created_at", "ASC"]
    ];
    const posts = await PostModel.findAll(detailsQuery);
    return posts.map((p) => PostDetailsMap.toDomain(p));
  }
  /**
   * Gets the average posts for a specific day from the database.
   *
   * @returns the average posts per user for a specific day in a form of `Number`.
   */
  public async getAveragePostsForDay(day: Date): Promise<Number> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createQueryWithFilterByDay(day);
    const posts = await PostModel.findAll(detailsQuery);

    if (posts.length === 0) {
      return 0;
    }

    let postsMembers: string[] = [];

    for (let i = 0; i < posts.length; i++) {
      let memberId = posts[i].member_id;

      if (postsMembers.indexOf(memberId) === -1) {
        postsMembers[postsMembers.length] = memberId;
      }
    }

    return posts.length / postsMembers.length;
  }

  /**
   * Returns the number of posts made by a specific member.
   * @param memberId - The ID of the member.
   * @returns A Promise that resolves to the number of posts made by the member.
   */
  public async getMemberPostCount(memberId: MemberId): Promise<number> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["member_id"] = memberId.id.toString();
    const postCount = await PostModel.count(detailsQuery);
    return postCount;
  }

  public async getPostBySlug(slug: string): Promise<Post> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["slug"] = slug;
    const post = await PostModel.findOne(detailsQuery);
    const found = !!post === true;
    if (!found) throw new Error("Post not found");
    return PostMap.toDomain(post);
  }

  public async exists(postId: PostId): Promise<boolean> {
    const PostModel = this.models.Post;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["post_id"] = postId.id.toString();
    const post = await PostModel.findOne(baseQuery);
    const found = !!post === true;
    return found;
  }

  public delete(postId: PostId): Promise<void> {
    const PostModel = this.models.Post;
    return PostModel.destroy({ where: { post_id: postId.id.toString() } });
  }

  private saveComments(comments: Comments) {
    return this.commentRepo.saveBulk(comments.getItems());
  }

  private savePostVotes(postVotes: PostVotes) {
    return this.postVotesRepo.saveBulk(postVotes);
  }

  public async getTotalNumberOfPosts(): Promise<number> {
    const result = await this.models.sequelize.query(
      `SELECT COUNT(*) FROM post;`
    );
    const count = result[0][0]["COUNT(*)"];
    return count;
  }
  //Sprint E

  public async getHourWiththeMostPostsCreatedInaDay(
    date?: Date
  ): Promise<number> {
    const formattedDate = new Date(date);

    const formattedDateString = `${formattedDate.getFullYear()}-${(
      formattedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${formattedDate
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    const result = await this.models.sequelize.query(
      `SELECT HOUR(created_at) AS hour, COUNT(*) AS count
      FROM post
      WHERE DATE(created_at) = "${formattedDateString}"
      GROUP BY hour
      ORDER BY count DESC
      LIMIT 1;`
    );

    const hour = result[0][0].hour || 0;

    return hour;
  }

  public async getNumberOfPostsWithoutCommentsByDate(
    date?: Date
  ): Promise<number> {
    const formattedDate = new Date(date);

    const formattedDateString = `${formattedDate.getFullYear()}-${(
      formattedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${formattedDate
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    console.log("<<<<<<<<<<<<<<<<<<<<<<" + formattedDateString);

    const result = await this.models.sequelize.query(
      `
      SELECT COUNT(DISTINCT post_id) AS postCount
      FROM post
      WHERE post_id NOT IN (
        SELECT post_id
        FROM comment
        WHERE DATE(created_at) = "${formattedDateString}");
      `
    );

    const count = result[0][0].postCount || 0;

    return count;
  }

  public async getListOfUsernamesWithoutPostAndWithoutCommentsByDate(
    date?: Date
  ): Promise<string[]> {
    const formattedDate = new Date(date);

    const formattedDateString = `${formattedDate.getFullYear()}-${(
      formattedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${formattedDate
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    console.log("SQL DATE<<<<<<<<<<<<<<<<<<<<<<" + formattedDateString);

    const result = await this.models.sequelize.query(
      `
      SELECT username
      FROM base_user
      WHERE base_user_id NOT IN (
        SELECT member_base_id
        FROM member
        WHERE member_id IN (
          SELECT member_id
          FROM post
          WHERE DATE(created_at) = "${formattedDateString}"
          UNION
          SELECT member_id
          FROM comment
          WHERE DATE(created_at) = "${formattedDateString}"
        )
      );
      `
    );

    const usernames = result[0].map((user: any) => user.username);
    console.log("SQL QUERY<<<<<<<<<<<<<<<<<<<<<<" + result);
    return usernames;
  }

  public async save(post: Post): Promise<void> {
    const PostModel = this.models.Post;
    const exists = await this.exists(post.postId);
    const isNewPost = !exists;
    const rawSequelizePost = await PostMap.toPersistence(post);

    if (isNewPost) {
      try {
        await PostModel.create(rawSequelizePost);
        await this.saveComments(post.comments);
        await this.savePostVotes(post.getVotes());
      } catch (err) {
        await this.delete(post.postId);
        throw new Error(err.toString());
      }
    } else {
      // Save non-aggregate tables before saving the aggregate
      // so that any domain events on the aggregate get dispatched
      await this.saveComments(post.comments);
      await this.savePostVotes(post.getVotes());

      await PostModel.update(rawSequelizePost, {
        // To make sure your hooks always run, make sure to include this in
        // the query
        individualHooks: true,
        hooks: true,
        where: { post_id: post.postId.id.toString() }
      });
    }
  }
}
