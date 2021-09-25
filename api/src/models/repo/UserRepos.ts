import { IsDefined, IsArray, IsString } from 'class-validator';
import AppRequest from '../AppRequest';

export class UserRepos extends AppRequest {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  public repos: string[];
}
