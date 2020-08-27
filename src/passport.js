import { Strategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import { User } from './models/User'

export default function (passport) {
  passport.use(
    new Strategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await User.findOne({
        email
      })
      if (!user) {
        return done(null, false, { message: 'That email is not registered' })
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      })
    })
  )

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}
