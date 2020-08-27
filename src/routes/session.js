import passport from 'passport'

export async function del (req, res) {
  req.logout()
  res.end()
}

export async function post (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.statusCode = 500
      res.end(JSON.stringify(err))
    }
    if (!user) {
      res.statusCode = 400
      res.end(info)
    }
    req.login(user, err => {
      if (err) {
        res.statusCode = 500
        res.end(JSON.stringify(err))
      }
      res.statusCode = 200
      res.end(JSON.stringify(user))
    })
  })(req, res, next)
}
