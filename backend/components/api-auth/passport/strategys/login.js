const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/Users')
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
    async function (username, password, done) {
        await User.findOne({ username: username }, async function (err, user) {
            try {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                const validPassword = await bcrypt.compare(password, user.password)
                if(validPassword === false) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                const userNopass = await User.findById(user._id, { password: 0 })
                return done(null, userNopass);
            } catch (error) {
                console.log("Error desde Login passport", error)
                done(error,false)
            }

        });
    }
));
