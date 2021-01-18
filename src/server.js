require('dotenv').config();

const app = require('./index');
const port = app.get('port');

app.listen(port, () => {
    console.log(`Server on port ${port}`)
})



