import { Injectable } from "@nestjs/common";
import { DeploymentService } from "src/modules/deployment.service";
import { AppUser } from "./app_user.model";
import { ContactFieldDto } from "./dto/set-user-data.dto";

@Injectable()
export class AppUsersService {
  constructor(private deploymentService: DeploymentService) {}

  get model() {
    return this.deploymentService.model(AppUser);
  }

  // create(app_user_id: string, createUserDto: ContactFieldDto): Promise<AppUser> {
  //   const user = new AppUser();
  //   user.app_user_id = app_user_id;
  //   user.contact_fields = createUserDto.contact_fields;

  //   return user.save();
  // }

  findOne(app_user_id: string): Promise<AppUser> {
    return this.model.findOne({
      where: {
        app_user_id,
      },
    });
  }

  getUserData(app_user_id: string): any {
    return { app_user_id, contact_fields: { example: "hellow" } };
  }
  async setUserData(app_user_id: string, data: ContactFieldDto) {
    let user = await this.model.findOne({ where: { app_user_id } });
    if (!user) {
      user = new AppUser();
      user.app_user_id = app_user_id;
    }
    return user.update({ ...data, app_user_id });
  }
}
