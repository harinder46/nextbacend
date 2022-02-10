import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { join } from "path/posix";
import { MailService } from "./mail.service";

@Module({
    imports:[
        MailerModule.forRoot({
            transport:{
                host:'www.google.com',
                secure: false,
                auth:{
                    user:'harinder@gmail.com',
                    password:'harinder46',
                }
            },
            defaults:{
                from:'"no reply <noreply@example.com>"'
            },
            template:{
                dir: join(__dirname, 'template'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                }
            }
        })
    ],
    providers:[MailService],
    exports:[MailService]
})

export class MailModule{}