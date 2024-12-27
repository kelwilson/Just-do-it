const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

// Having errors with the old code, so used chat gpt for a new fix

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }

        if (!user.password) {
              return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
                  }

        // Validate password (add your own logic here)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { msg: 'Invalid email or password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};


// Old outdated code 
// module.exports = function (passport) {
//     passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
//       User.findOne({ email: email.toLowerCase() }, (err, user) => {
//         if (err) { return done(err) }
//         if (!user) {
//           return done(null, false, { msg: `Email ${email} not found.` })
//         }
//         if (!user.password) {
//           return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
//         }
//         user.comparePassword(password, (err, isMatch) => {
//           if (err) { return done(err) }
//           if (isMatch) {
//             return done(null, user)
//           }
//           return done(null, false, { msg: 'Invalid email or password.' })
//         })
//       })
//     }))
    
  
//     passport.serializeUser((user, done) => {
//       done(null, user.id)
//     })
  
//     passport.deserializeUser((id, done) => {
//       User.findById(id, (err, user) => done(err, user))
//     })
//   }

