<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
include_once 'JWT.php';
include_once 'BeforeValidException.php';
include_once 'ExpiredException.php';
include_once 'SignatureInvalidException.php';
include_once '../vendor/autoload.php';
include_once  '../PHP/clases/usuarios.php';


/*'
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', function ($request, $response, $args) { //
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */ 
$app->post('/token[/{correo}{clave}]', function ($request, $response, $args) {

 $objUsuario=$request->getParsedBody();

  if (usuario::ValidarSiExiste(json_encode($objUsuario))) {
     
    $token = array(
    "correo" => json_decode(json_encode($objUsuario["correo"])),
    "perfil" =>"administrador" ,
    "exp" => time()+9600 );

    $token=Firebase\JWT\JWT::encode($token,"ABM_Usuario");
    $array["token2017"]=$token;
      
      echo json_encode($array);
    return true;
  }
  else{
    echo "usuario o contraseña incorrecta";
  }

});

$app->get('/grilla[/]', function ($request, $response, $args) {
    // $response->write("hola roko ");
    $listado=usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($listado));
    return $response;
});

$app->post('/imagen[/]', function ($request, $response, $args) {
    
     $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
     // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
      $uploadPath = "../fotos/". $_FILES[ 'file' ][ 'name' ];
      move_uploaded_file( $tempPath, $uploadPath );
      $answer = array( 'respuesta' => 'Archivo Cargado!' );
      $json = json_encode( $answer );
      $response->write(var_dump($json));
      echo $json;
});

$app->post('/Borrar[/{usuario}]', function ($request, $response, $args) {

        $objUsuario=$request->getParsedBody();
     
        if($objUsuario["usuario"]["foto"]!="pordefecto.png")
        {
          unlink("../fotos/".$objUsuario["usuario"]["foto"]);
        }
        usuario::BorrarUsuario($objUsuario["usuario"]["id"]);
        
        // $response->write(var_dump($objUsuario));
        });

$app->post('/modificar[/{usuario}]', function ($request, $response, $args) {
  $objUsuario=$request->getParsedBody();

  if($objUsuario["usuario"]["foto"]!="pordefecto.png"){
          
      $rutaVieja="../fotos/".$objUsuario["usuario"]["foto"];
      
      $rutaNueva=$objUsuario["usuario"]["id"].".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        
        copy($rutaVieja, "../fotos/".$rutaNueva);
        unlink($rutaVieja);

      $objUsuario["usuario"]["foto"]=$rutaNueva;
  }
  usuario::ModificarUsuario(json_encode($objUsuario["usuario"]));

    $response->write(var_dump($objUsuario['usuario']));
    return $response;
   
});
$app->post('/insertar[/{usuario}]', function ($request, $response, $args) {
   
  $objUsuario=$request->getParsedBody();
         
    if($objUsuario["usuario"]["foto"]!="pordefecto.png"){
         $rutaVieja="../fotos/".$objUsuario["usuario"]["foto"];
          $rutaNueva=$objUsuario["usuario"]["id"].".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
          copy($rutaVieja, "../fotos/".$rutaNueva);
          unlink($rutaVieja);
          $objUsuario["usuario"]["foto"]=$rutaNueva;
    }
     usuario::InsertarUsuario(json_encode($objUsuario['usuario']));
        
       // $response->write(var_dump($objUsuario));
});

$app->run();

//loguin y alta baja usuario ,modificacion q lo hace el mismo ususario de su perfil o el admin
//que puede ver cada usuario
//botones de test  en el loguin uno q  
