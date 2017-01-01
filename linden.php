<!doctype html>
<html>
<head>
    <title>Linden</title>
    <link rel="stylesheet" type="text/css" href="css/normalize.css" />
    <link rel="stylesheet" type="text/css" href="css/linden.css" />
</head>
<body>

<!-- html contents -->

<div id="state">

<div id="history-container">
  <div id="history"></div>
</div>
<div id="input-container">
  <input id="input" />
</div>

</div>

<!-- load in all ye javascript -->
<?php
  function include_file($file) {
    echo '<script type="text/javascript" src="' . $file . '"></script>';
  }
  function include_directory($path) {
    $files = scandir($path);
    foreach($files as $file) {
      if ($file === '.' || $file === '..') {
        continue;
      }
      if (is_dir($file)) {
        include_directory($path . '/' . $file);
      } else {
        include_file($path . '/' . $file);
      }
    }
  }
  // base file - namespace, must be loaded first
  include_file('js/linden.js');

  // states
  include_file('js/state.js');
  include_directory('js/state');

  // start with an initial state - must be loaded last
  include_file('js/init.js');
?>

</body>
</html>

