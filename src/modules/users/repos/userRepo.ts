import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";
import { UserName } from "../domain/userName";
import { MemberDetails } from "../../forum/domain/memberDetails";
import Users from "../../../api_test/endpoints/Users";

export interface IUserRepo {
  [x: string]: any;

  exists(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserIdByUserName(username: string): Promise<string>;
  getUserByUserName(userName: UserName | string): Promise<User>;
  save(user: User): Promise<void>;
  deleteUser(username: string): Promise<void>;
  getPopularUser(): Promise<User>;
  getUserByMemberId(memberId: string): Promise<User>;
  getNumberOfPostsAndComments(username: UserName): Promise<any>;
}
