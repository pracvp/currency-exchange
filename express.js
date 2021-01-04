const express = require('express');
const app = express();
const path = require("path");

app.use(Express.static(path.join(__dirname, '../public')));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});




app.listen(process.env.PORT || 3000, () => console.log('Gator app listening on port 3000!'));
