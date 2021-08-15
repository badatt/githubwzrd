import { IsDefined, IsArray, IsString } from 'class-validator';

export class UserRepos {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  public repos: string[];
}
