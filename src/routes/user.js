import { User } from '../models/User'
import bcrypt from 'bcryptjs'

export async function get (req, res) {
  res.end(JSON.stringify(req.user))
}

export async function post (req, res) {
  const { name, email, password, passwordConfirm } = req.body

  const errors = {}

  if (!name) errors.name = 'This field is required'
  if (!email) errors.email = 'This field is required'
  if (!password) errors.password = 'This field is required'
  if (!passwordConfirm) errors.passwordConfirm = 'This field is required'

  if (password !== passwordConfirm) {
    errors.password = 'Passwords do not match'
    errors.passwordConfirm = 'Passwords do not match'
  }

  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (Object.keys(errors).length > 0) {
    res.statusCode = 400
    res.end(JSON.stringify(errors))
  } else {
    const user = await User.findOne({ email })
    if (user) {
      errors.email = 'That email is already in use'
      res.statusCode = 400
      res.end(JSON.stringify(errors))
    } else {
      const newUser = new User({
        name,
        email,
        password
      })

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          res.statusCode = 500
          res.end(JSON.stringify(err))
        }

        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) {
            res.statusCode = 500
            res.end(JSON.stringify(err))
          }

          newUser.password = hash
          try {
            const savedUser = await newUser.save()
            res.end(JSON.stringify(savedUser))
          } catch (error) {
            res.statusCode = 500
            res.end(JSON.stringify(error))
          }
        })
      })
    }
  }
}
