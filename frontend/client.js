"use strict";
exports.__esModule = true;
// fs.readFile("test.txt", function (err, data) {
//     if (err) throw err;
//     console.log(data);
// });
var axios_1 = require("axios");
// import console = require('console');
console.log('Starting test script...');
axios_1["default"].post('http://localhost:8000/api/configs/', [
        {
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
}).then(function (response) {
    console.log('success!');
})["catch"](function (err) {
    console.log(err);
});
