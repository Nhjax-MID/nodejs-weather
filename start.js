const {PythonShell} = require("python-shell");

let options = {
  mode: 'json',};

PythonShell.run('script.py', options, function (err, results) {
  if (err) throw err;
  console.log('finished');
  console.log(results);
});
