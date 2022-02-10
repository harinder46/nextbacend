import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "src/users/user";


@Injectable()

export class MailService{
    constructor(private mailerService: MailerService) {}


    async SendUserConfirmation(user: User, token: string){
        const url = 'google.com/auth/confirm?token=${token}';
        await this.mailerService.sendMail({
            to: user.email,

            subject: 'wellcome to app',
            template: 'confirmation',
            context:{
                name: user,
                url,
            }
        })
    }
}