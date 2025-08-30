import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js"
import transporter, { accountEmail } from "../config/nodemailer.js";



const sendReminderEmail = async ({to, type, subscription}) => {
    if (!type) throw new Error('Missing required parameters')

        const template = emailTemplates.find((t) => t.label === type);

        if (!template) throw new Error('Invalid email type');

        const mailInfo = {
            userName: subscription.user.name,
            subscriptionName: subscription.name,
            renewalDate:dayjs(subscription.renewalDate).format('MMM D, YYYY'),
            planName: subscription.name,
            price: `${subscription.currency} ${subscription.payementMethod} (${subscription.frequenccy})`,
            paymentMethod: subscription.payementMethod ,
        }

        const message = template.generateBody(mailInfo);

        const subject = template.generateSubject(mailInfo);

        const mailOptions = {
            from: accountEmail,
            to:to,
            subject:subject,
            html:message,
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) return console.log(error, 'Error sending email');
            
            console.log("Message sent:", info.response);

        })
}

export default sendReminderEmail;