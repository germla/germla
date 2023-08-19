// @ts-nocheck
import nodemailer from "nodemailer";
import { env } from "./env";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { APP_NAME, BASE_URL } from "@germla/config/constants";
import * as Maizzle from "@maizzle/framework";
import fs from "fs";

// let transporter = nodemailer.createTransport({
//   // @ts-ignore
//   host: env.SMTP_HOST,
//   port: env.SMTP_PORT,
//   secure: env.SMTP_SECURE,
//   auth: {
//     user: env.SMTP_USERNAME,
//     pass: env.SMTP_PASSWORD,
//   },
//   logger: process.env.DEBUG,
//   debug: process.env.DEBUG,
// } as SMTPTransport.Options);

// const emailDefaults = {
//   from: `${APP_NAME} <no-reply@${new URL(BASE_URL).host}>`,
// };

interface SendEmailOptions {
  to: string;
  subject: string;
  template: "confirmation";
  data: Object;
}

const templates = {
  confirmation: fs.readFileSync(process.cwd() + "/src/templates/transactional.html", "utf8"),
};

export const sendEmail = async (options: SendEmailOptions) => {
  Maizzle.render(templates.confirmation, {
    tailwind: {
      config: require("../tailwind.config.js"),
      css: `img {
                @apply max-w-full leading-none align-middle;
                border: 0;
              } @layer utilities {
                .break-word {
                  word-break: break-word;
                }
              }`,
        
    },
    maizzle: require('../config.js'),
    beforeRender: (config) => {
        config = {
            link: 'example',
                app: {
                    name: 'xyz',
                    url: 'https://example.com',
                }
        }
    }
  }).then(({ html }) => {
    console.log(html);
  })
};


sendEmail({
    to: "Gaurish",
    subject: "Test",
    template: "confirmation",
    data: {
        link: "https://germla.space",
    },
})