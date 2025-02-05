import { Controller, Get, Headers, Module } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { environment } from "../../environment";
import { DeploymentHeaders } from "src/modules/deployment.decorators";

@Controller()
class DefaultController {
  // @Get("")
  // @ApiOperation({ summary: "Redirect to docs" })
  // redirect(@Res() res) {
  //   return res.redirect("/api");
  // }

  @Get("status")
  @ApiOperation({ summary: "Check server status" })
  @DeploymentHeaders()
  checkStatus(@Headers("x-deployment-db-name") db_name = environment.APP_DB_NAME) {
    return `[${db_name}] API Up`;
  }
}

@Module({
  controllers: [DefaultController],
})
export class DefaultModule {}
