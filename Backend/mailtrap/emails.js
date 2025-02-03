import {mailtrapclient, sender} from "../mailtrap/mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";

export const sendverificationEmail = async (email, verificationToken) =>{

    const recipient = [{email}];

    try {
       const response = await mailtrapclient.send({
        from:sender,
        to:recipient,
        subject:"Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        category: "Email verification"
       })

       console.log("Email sent successfully", response);
    } catch (error) {
        throw new Error("Error sending verification email")
    }
}

export const sendWelcomeEmail = async (email,name) => {

    const recipient = [{ email }];

	try {
		const response = await mailtrapclient.send({
			from: sender,
			to: recipient,
			template_uuid: "a9abe596-83ba-4394-bb39-9d5c7695c4bb",
			template_variables: {
				company_info_name: "STS",
				name: name,
			},
		});

		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
	}
}

export const sendPasswordResetEmail = async (email,resetURL) => {

	const recipient = [{email}];

	try {
		const response = await mailtrapclient.send({
			from:sender,
			to:recipient,
			subject:"Reset your password",
			html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}" ,resetURL),
			category:"Password reset",
		})
		console.log("Reset password email was sent successfully");
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
}

export const sendResetSuccessEmail = async (email) =>{

	const recipient = [{email}];

	try {
		const response = await mailtrapclient.send({
			from:sender,
			to:recipient,
			subject:"Password reset successfull",
			html:PASSWORD_RESET_SUCCESS_TEMPLATE,
			category:"Password reset success"
		});
		
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
}