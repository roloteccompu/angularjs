app.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }
});
app.factory('factoryUsuarios',function(servicioUsuario){
  
  var usuarios={
    traerUsers:function(){
      return servicioUsuario.retornarUsuarios().then(function(respuesta){
         return respuesta;
      });
    }
  };
  return usuarios;
});
app.service('servicioUsuario',function($http){
    var listado;
    this.retornarUsuarios=function(){
        return $http.get('Datos/grilla')
               .then(function(respuesta) {       
                      return respuesta.data;
              });
    };
});
