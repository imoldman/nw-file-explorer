var folder_view = require('folder_view');
var abar = require('address_bar');

$(document).ready(function() {
  global.$ = $;

  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  folder.open(process.cwd());
  addressbar.set(process.cwd());

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  });
});
