var express = require('express'),
router = express.Router();

router.get("/", function(req, res) {
  res.render('index');
});

router.use('/users', require('./routes/users'));

router.get('/partials/:template', function(request, response) {
  response.render('partials/' + request.params.template);
});

module.exports = router;
