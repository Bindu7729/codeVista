const app = require('./app');

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(CodeVista Core Engine pipeline running on port );
  });
}

module.exports = app;
