<?php

if($_FILES){
    echo json_encode($_FILES, JSON_PRETTY_PRINT);
    $uploads_dir = 'files';
    $tmp_name = $_FILES["file"]["tmp_name"];
    $name = basename($_FILES["file"]["name"]);
    move_uploaded_file($tmp_name, "$uploads_dir/$name");
}else{
    echo "No files";
}