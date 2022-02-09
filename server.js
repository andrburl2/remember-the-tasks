const express = require('express');

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

const app = express();
app.listen(process.env.PORT || 8080);

app.use(requireHTTPS);
app.use(express.static('dist/remember-the-tasks'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist/remember-the-tasks' });
});