// fs.readFile("test.txt", function (err, data) {
//     if (err) throw err;
//     console.log(data);
// });
import axios from 'axios';

// import console = require('console');

console.log('Starting test script...')

axios.post('http://localhost:8000/api/configs/', {
  candidate: [
    {
      id: 216,
      config_ref: 36,
      position: 1,
      candidate: 1
    },
    {
      id: 217,
      config_ref: 36,
      position: 2,
      candidate: 2
    }
  ]
}).then(response => {
  console.log('success!');
}).catch(err => {
  console.log(err);
});
