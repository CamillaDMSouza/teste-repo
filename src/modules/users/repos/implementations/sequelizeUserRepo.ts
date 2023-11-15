import { IUserRepo } from "../userRepo";
import { UserName } from "../../domain/userName";
import { User } from "../../domain/user";
import { UserMap } from "../../mappers/userMap";
import { UserEmail } from "../../domain/userEmail";
import { IMemberRepo } from "../../../forum/repos/memberRepo";
import { IPostRepo } from "../../../forum/repos/postRepo";
import { ICommentRepo } from "../../../forum/repos/commentRepo";

export class SequelizeUserRepo implements IUserRepo {
  private models: any;
  private memberRepo: IMemberRepo;
  private postRepo: IPostRepo;

  constructor(models: any) {
    this.models = models;
    this.memberRepo = this.memberRepo;
    this.postRepo = this.postRepo;
  }

  async exists(userEmail: UserEmail): Promise<boolean> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        user_email: userEmail.value
      }
    });
    return !!baseUser;
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        username:
          userName instanceof UserName ? (userName as UserName).value : userName
      }
    });
    if (!baseUser) throw new Error("User not found.");
    return UserMap.toDomain(baseUser);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        base_user_id: userId
      }
    });
    if (!baseUser) throw new Error("User not found.");
    return UserMap.toDomain(baseUser);
  }

  async save(user: User): Promise<void> {
    const UserModel = this.models.BaseUser;
    const exists = await this.exists(user.email);
    const rawSequelizeUser = await UserMap.toPersistence(user);

    if (!exists) {
      await UserModel.create(rawSequelizeUser);
    } else {
      await UserModel.update(rawSequelizeUser, {
        where: { user_email: user.email.value }
      });
    }

    return;
  }

  async deleteUser(username: string): Promise<void> {
    const BaseUserModel = this.models.BaseUser;
    await BaseUserModel.destroy({
      where: {
        username
      }
    });
    return;
  }

  async getUserIdByUserName(username: string): Promise<string> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        username: username
      }
    });

    return UserMap.toDomain(baseUser).userId.id.toString();
  }

  private createMemberDetailsQuery(memberId: string): any {
    return {
      where: {
        member_id: memberId
      },
      include: [
        {
          model: this.models.BaseUser,
          required: true
        }
      ]
    };
  }

  private createGetPopularUserMemberIdQuery(): any {
    return this.models.sequelize.query(
      "select m.member_id, COUNT(*) as total_count, MAX(m.created_at) as member_created_at from( select p.member_id, p.created_at from post p union all SELECT c.member_id, c.created_at from comment c) as combined inner join member m on combined.member_id = m.member_id group by m.member_id order by total_count DESC, member_created_at DESC;"
    );
  }

  async getPopularUser(): Promise<User> {
    const result = await this.createGetPopularUserMemberIdQuery();
    const firstMemberInTheList = 0;
    const memberId =
      result[firstMemberInTheList][firstMemberInTheList].member_id;

    const baseUser = await this.getUserByMemberId(memberId);

    return baseUser;
  }

  async getUserByMemberId(memberId: string): Promise<User> {
    const member = this.createMemberDetailsQuery(memberId);
    const baseUser = await this.getUserByUserId(member.member_base_id);
    if (!!baseUser === false) throw new Error("User not found.");
    return baseUser;
  }

  private getNumberOfPostsByMemberId(memberId: string): Promise<number> {
    return this.models.Post.count({
      where: {
        member_id: memberId
      }
    });
  }

  private getNumberOfCommentsByMemberId(memberId: string): Promise<number> {
    return this.models.Comment.count({
      where: {
        member_id: memberId
      }
    });
  }
  async getNumberOfPostsAndComments(username: UserName): Promise<any> {
    const user = await this.getUserByUserName(username);
    const member = await this.memberRepo.getMemberByUserId(user.id.toString());
    const numberOfPosts = await this.getNumberOfPostsByMemberId(
      member.memberId.id.toString()
    );
    const numberOfComments = await this.getNumberOfCommentsByMemberId(
      member.memberId.id.toString()
    );
    return { numberOfPosts, numberOfComments };
  }
}
