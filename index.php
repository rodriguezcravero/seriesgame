<?php 

function getUniqueVisitorCount($ip)
{
    session_start();
    if(!isset($_SESSION['current_user']))
    {
        $file = 'counter.txt';
        if(!$data = @file_get_contents($file))
        {
            file_put_contents($file, base64_encode($ip));
            $_SESSION['visitor_count'] = 1;
        }
        else{
            $decodedData = base64_decode($data);
            $ipList      = explode(';', $decodedData);

            if(!in_array($ip, $ipList)){
              array_push($ipList, $ip);
              file_put_contents($file, base64_encode(implode(';', $ipList)));
            }
            $_SESSION['visitor_count'] = count($ipList);
        }
        $_SESSION['current_user'] = $ip;
    }
}

$ip = $_SERVER['REMOTE_ADDR'];
getUniqueVisitorCount($ip);

$conteo = $_SESSION['visitor_count'];

$archivo = 'contador.txt';

file_put_contents($archivo, $conteo);

include_once("inicio.html");

?>
