const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const GOOGLE_CLIENT_ID =
	"639495684083-a1v48et7h2nj4mvvhkv1elksrb8qkhkm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
// const baseUrl = "https://examtrack.up.railway.app";
const baseUrl = "http://localhost:5000";
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: `${baseUrl}/auth/google/callback`,
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {
		
			try {
				// Try to find the user based on their email
				let user = await User.findOne({ email: profile.emails[0].value });

				if (user) {
					// If the user exists, update their profile information
					user.firstName = profile.name.givenName;
					user.lastName = profile.name.familyName;
					user.photo = profile.photos[0].value;
				} else {
					// If the user doesn't exist, create a new user
					user = new User({
						firstName: profile.name.givenName,
						lastName: profile.name.familyName,
						email: profile.emails[0].value,
						photo: profile.photos[0].value,
					});
				}

				// Save the user to the database
				await user.save();

				// Return the user object
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});
