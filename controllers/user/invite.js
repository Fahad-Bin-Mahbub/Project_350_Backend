const asyncHandler = require("../../middlewares/asyncHandler");

const Invite = require("../../models/user/invite");
const User = require("../../models/user");
const Admin = require("../../models/user/admin");
const ErrorResponse = require("../../utils/errorResponse");
const { getInviteTemplate } = require("../../utils/emailTemplates");
const sendTokenResponse = require("../../utils/tokenResponse");
const nodemailer = require("nodemailer");
exports.createInvite = asyncHandler(async (req, res, next) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) {
		return next(
			new ErrorResponse(
				`${(req.body.role)} with this email already exists`,
				500
			)
		);
	}
	const data = { ...req.body, invitedBy: req.user.id };
	const invite = await Invite.create(data);
	console.log(invite);
	try {
		const output = getInviteTemplate(invite.token);
		const subject = "Invite to join the platform";
		console.log(output);
		// const mail = await sendEmail(invite.email, subject, output);

		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: "fahadbm3234@gmail.com",
				pass: "tmxi ulez ezyg zlzx",
			},
		});

		let details = {
			from: "fahadbm3234@gmail.com",
			to: invite.email,
			subject: subject,
			html: output,
		};

		const mail = await transporter.sendMail(details, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log("Email sent");
			}
		});
		res.json({
			success: true,
			message: "Invite sent successfully",
		});
	} catch (error) {
		console.log(error);
		await Invite.findByIdAndDelete(invite.id);
		return next(new ErrorResponse("Invite not sent", 500));
	}
});

exports.getInviteByToken = asyncHandler(async (req, res, next) => {
	const invite = await Invite.findOne({ token: req.params.token });

	if (!invite) return next(new ErrorResponse("Invite not found", 404));

	res.json({ success: true, data: invite });
});

exports.getAllInvites = asyncHandler(async (req, res, next) => {
	const invites = await Invite.find();

	res.json({ success: true, data: invites });
});

exports.deleteInvite = asyncHandler(async (req, res, next) => {
	const invite = await Invite.findByIdAndDelete(req.params.id);

	if (!invite) return next(new ErrorResponse("Invite not found", 404));

	res.json({ success: true });
});

exports.acceptInvite = asyncHandler(async (req, res, next) => {
	const invite = await Invite.findOne({ token: req.body.token });

	if (!invite) return next(new ErrorResponse("Invite not found", 404));

	let user = await User.findOne({ email: invite.email });

	if (user) {
		if (user.roles.includes(invite.role))
			return next(
				new ErrorResponse(`${invite.role} with this email already exists`, 500)
			);

		user.roles.push(invite.role);

		await user.save();
	} else
		user = await User.create({
			firstName: invite.firstName || "",
			lastName: invite.lastName || "",
			email: invite.email,
			roles: [invite.role],
			department: [invite.department],
			...req.body,
		});

	await Invite.findByIdAndUpdate(invite.id, { status: "accepted" });

	const usr = user.toObject();
	delete usr.password;

	sendTokenResponse(usr, res);
});
