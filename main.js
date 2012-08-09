var abar = require('address_bar');
var folder_view = require('folder_view');
var path = require('path');

$(document).ready(function() {
  global.$ = $;

  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  folder.open(process.cwd());
  addressbar.set(process.cwd());

  folder.on('navigate', function(dir, mine) {
    if (mine.type == 'folder') {
      addressbar.enter(mine);
    }
  });

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  });
});
