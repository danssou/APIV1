import nodemailer from 'nodemailer';
import { GOOGLE_PASS } from './env.js';



export const accountEmail = 'brightdanssou@gmail.com';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: accountEmail,
        pass:GOOGLE_PASS
    }
})

export default transporter;