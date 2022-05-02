import { Inject, Injectable } from "@nestjs/common";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";

import { AuthModuleConfig, ConfigInjectionToken } from "../config.interface";
import { UserService } from "../../user/user.service";

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig, userService: UserService) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey
      },
      recipeList: [
        EmailPassword.init({
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function(input) {

                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error("Should never come here");
                  }

                  // First we call the original implementation of signUpPOST.
                  let response = await originalImplementation.signUpPOST(input);

                  // Post sign up response, we check if it was successful
                  if (response.status === "OK") {
                    let { id, email } = response.user;

                    // // These are the input form fields values that the user used while signing up
                    let formFields = input.formFields;

                    await userService.createUser(email, id);
                  }
                  return response;
                }
              };
            }
          }
        }),
        Session.init({
          errorHandlers: {
            onUnauthorised: async (message, request, response) => {
              response.setStatusCode(401);
              response.sendHTMLResponse(
                "<!DOCTYPE html>\n" +
                "<html lang=\"ru\">\n" +
                "<head>\n" +
                "<meta http-equiv=\"refresh\" content=\"1;URL=/login\" />" +
                "</head>");
            }
          }
        })
      ]
    });
  }
}