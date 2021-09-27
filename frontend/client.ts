// fs.readFile("test.txt", function (err, data) {
//     if (err) throw err;
//     console.log(data);
// });
import axios from 'axios';

// import console = require('console');

console.log('Starting test script...')

axios.post('http://localhost:8000/api/configs/', [
    {
      config_ref: 1,
      position: 3,
      candidate: 5
    },
    {
      config_ref: 1,
      position: 8,
      candidate: 7
    }
  ]
).then(response => {
  console.log('success!');
}).catch(err => {
  console.log(err);
});
