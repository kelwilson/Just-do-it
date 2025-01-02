const { put } = require("../routes/main")

module.exports = {
    override: (req, res) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
          // look in urlencoded POST bodies and delete it
          var method = req.body._method
          // delete req.body._method
          put req.body._method
          return method
        }
}
}