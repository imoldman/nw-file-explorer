var fs = require('fs');
var path = require('path');

// Get avaliable types
var avaliable_types = [];
{
  var files = fs.readdirSync('icons');
  for (i in files) {
    avaliable_types.push(path.basename(files[i], '.png'));
  }
}

var gen_files_view = _.template(
    '<div class="file"> \
      <div class="icon"><img src="icons/<%= type %>.png"/></div> \
      <div class="name"><%= name %></div> \
    </div>'
);

function file_mine(filepath) {
  var result = {
    name: path.basename(filepath),
  };

  var stat = fs.statSync(filepath);
  if (stat.isDirectory()) {
    result.type = 'folder';
  } else {
    var ext = path.extname(filepath).substr(1);
    if (_.include(avaliable_types, ext))
      result.type = ext;
    else
      result.type = 'blank';
  }

  return result;
}

function fs_show(dir) {
  fs.readdir(dir, function(error, files) {
    var list = $('#files');
    for (i in files) {
      list.append(gen_files_view(
          file_mine(path.join(dir, files[i]))
      ));
    }
  });
}

$(document).ready(function() {
  fs_show(process.cwd());
});
