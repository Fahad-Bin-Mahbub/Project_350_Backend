exports.getInviteTemplate = (token) => {
	const template = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Invitation to join</title>
    </head>

    <body style="font-family: Arial, Helvetica, sans-serif;background: #e8f5f5;width: 700px;height: 500px;margin: auto;">
        <div class="container"
            style="width: 70%;margin:auto;background-color: white;padding: 50px 80px;border-top: 5px solid purple;border-bottom: 4px solid skyblue;">

            <div class="secondary-container" style="margin-top: 40px;">
                <h1 class="confirmation-email-heading">You are invited to exam paper tracking site</h1>
                <p class="heading-greetings">Dear user,</p>
                <p class="normal-text">Please click the link below to create your account. This link is valid for 7 days.
                </p>
                <p class="token"
                    style="width: 100px;margin: 40px auto;text-align: center;padding:15px 60px;background: #104cba; font-size: 18px;border-radius: 5px;">
                    <a style="color: white" href='http://localhost:5173/invitationAccept?token=${token}'>Click here</a></p>
                <p class="footer-greetings_one" style="margin-top: 40px;">Regards,</p>
                <p class="footer-greetings">Project 350 Team</p>
            </div>
        </div>
        <p class="small-footer" style="color:rgba(82, 78, 78, 0.781);text-align: center;font-size: small;">
            This invite is sent from Project 350 team
        </p>
    </body>

    </html>`;

	return template;
};
