app.controller('controlHome', function($scope,$http,$auth,$state) { 
  console.log("controlHome");
});
app.controller('controlLogin', function($scope,$http,$auth,$state) { 

  $scope.correo="rolanVega@gmail.com";
  $scope.clave="123456";

   $scope.logear=function() {

    var userCorreo = $scope.correo;
    var userClave= $scope.clave;
    

      $auth.login({correo:userCorreo,clave:userClave})
      .then(function(respuestaAuth){
     
           console.info(respuestaAuth.data); 

          if($auth.isAuthenticated()){

            $state.go('home');
          }
          else{
            $scope.respuesta="usuario o contraseña incorrecta";
          }
      })
      .catch(function(parametro){
             console.info("Error Catch", parametro.error);
      });
   };
});
app.controller('controlMenu', function($scope,$http,$auth,$state) { 
 
  var objetoAuth={};
   objetoAuth=$auth.getPayload();
  $scope.userActual=" "+objetoAuth.correo;
  
   var objeto={};
   objeto=$auth.getPayload();
   console.log(objeto.correo);
   $scope.deslogear=function() {
   
        $auth.logout()
        .then(function(respuestaAuth){

            if($auth.isAuthenticated())
            
               $state.go('menu');
             else
               $state.go('login');
        })
        .catch(function(parametro){
             console.info("Error Catch", parametro.error);
        });
   };
});


app.controller('controlAlta', function($scope,$auth, $http ,$state,FileUploader,cargadoDeFoto) {
  
  $scope.uploader = new FileUploader({url: 'Datos/imagen'});
  $scope.uploader.queueLimit = 1;

  //inicio las variables
  $scope.usuario={};
  $scope.usuario.nombre= "" ;
  $scope.usuario.correo= "" ;
  $scope.usuario.clave= "" ;
  $scope.usuario.foto="pordefecto.png";
  
  cargadoDeFoto.CargarFoto($scope.usuario.foto,$scope.uploader);

  $scope.Guardar=function(){
      console.log($scope.uploader.queue);
      
      if($scope.uploader.queue[0].file.name!='pordefecto.png'){

        var pathFoto = $scope.uploader.queue[0]._file.name;
        $scope.usuario.foto=pathFoto;
      }
          $scope.uploader.uploadAll();
          console.log("usuario a guardar:");
          console.log($scope.usuario);
  }
     $scope.uploader.onSuccessItem=function(item, response, status, headers)
    {
      var usuarioNuevo=$scope.usuario;
      $http.post('Datos/insertar', { usuario:usuarioNuevo})
      .then(function(respuesta) {       
                 
          console.log(respuesta.data);
          $state.go("grilla");

      },function errorCallback(response) {        
         
          console.log( response);           
      });
     console.info("Ya guardé el archivo.", item, response, status, headers);
    };
});

app.controller('controlGrilla', function($scope, $auth,$http,$state,factoryUsuarios) {
           
  factoryUsuarios.traerUsers().then(function(respuesta){
  $scope.ListadoUsuarios =respuesta;
  });
 
    $scope.Borrar=function(usuarioABorrar){ 
    $http.post("Datos/Borrar",{usuario:usuarioABorrar})
      .then(function(respuesta) {       

            console.log(respuesta.data);
            $http.get('Datos/grilla')
            .then(function(respuesta) {       

                 $scope.ListadoUsuarios = respuesta.data;
                 console.log(respuesta.data);

            },function errorCallback(response) {
                  $scope.ListadoUsuarios= [];
                  console.log(response);     
            });

      },function errorCallback(response) {        
          console.log( response);           
      });
   	}
});

app.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader,cargadoDeFoto){
  
  $scope.usuario={};
  $scope.uploader = new FileUploader({url:'Datos/imagen'});
  $scope.uploader.queueLimit = 1;
  $scope.usuario.id=$stateParams.id;
  $scope.usuario.nombre=$stateParams.nombre;
  $scope.usuario.correo=$stateParams.correo;
  $scope.usuario.clave=$stateParams.clave;
  $scope.usuario.foto=$stateParams.foto;

    cargadoDeFoto.CargarFoto($scope.usuario.foto,$scope.uploader);
    
      $scope.Guardar=function(usuario){
        if($scope.uploader.queue[0].file.name!='pordefecto.png'){
            var pathFoto = $scope.uploader.queue[0]._file.name;
            $scope.usuario.foto=pathFoto;
        }
            $scope.uploader.uploadAll();
      }

      $scope.uploader.onSuccessItem=function(item, response,status, headers){
          $http.post('Datos/modificar', {usuario:$scope.usuario})
          .then(function(respuesta){      
               console.log(respuesta.data);
               $state.go("grilla");
          },
          function errorCallback(response)
          {
               console.log( response);           
          });
               console.info("Ya guardé el archivo.", item, response, status, headers);
      };
});