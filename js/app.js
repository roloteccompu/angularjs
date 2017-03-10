
var app = angular.module('ABMangularPHP', ['ui.router','angularFileUpload', 'satellizer'])
.config(function($stateProvider, $urlRouterProvider,$authProvider) {
  
  $authProvider.loginUrl='angular/Datos/token';
  $authProvider.singUrl='angular/Datos/token';
  $authProvider.tokenName='token2017';
  $authProvider.tokenPrefix='ABM_Usuario';
  $authProvider.authHeader =  'Data';
 
 //views de los controladores
$stateProvider

    .state('home', {
     url: '/home',
    views: {
      'principal': { templateUrl: 'template/home.html',controller: 'controlHome' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html',controller:'controlMenu'}
    }
    ,url:'/menu'
     })

    .state('grilla', {
    url: '/grilla',
    views: {
      'principal': { templateUrl: 'template/templateGrilla.html',controller: 'controlGrilla' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html',controller:'controlMenu'}
    }
    })
    .state('alta', {
    url: '/alta',
    views: {
      'principal': { templateUrl: 'template/templateAlta.html',controller: 'controlAlta' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html',controller:'controlMenu'}
    }
    })

      .state('modificar', {
    url: '/modificar/{id}?:nombre:correo:clave:foto',
     views: {
      'principal': { templateUrl: 'template/templateModificacion.html',controller: 'controlModificacion' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html',controller:'controlMenu'}
    }

   })
      .state('login', {
    url: '/login',
    views: {
      'principal': { templateUrl: 'template/templateLogin.html',controller: 'controlLogin' },
      'menuSuperior': {templateUrl: 'template/menuLogin.html'}
    }
    
    
})
// if none of the above states are matched, use this as the fallback

$urlRouterProvider.otherwise('/login');
});

//app.controller('controlModificacion')

//app.service('cargadoDeFoto',function($http,FileUploader){
 /* convencion corporativa por invitacion
salon del automovil:
el muchacho tiene un sistema q solo carga a los representntes 
y los habililto para cargar un numero de empleados
el muchacho cargar solo a los representntes les doy un usuario y un password
yo soy administrador
una persona se acerca a ventanilla para ver si esta invitado y por cual empresa
da el numero de su dni no s pueden repetir los invitados en ninguna listado
dar de alta invitados ,empresa,administradores de empresa,donde se encuentra el evento
la acreditadora tambien debe tener un usuario y pasword para para marcar quien vino y quien no
guardar una estadistica d quien se logueo cuantas veces q hizo fecha

sercicios y factories
que devuelve un servicio y q devuelve una factory
como mostrar los datos del error
encontrar el error
yeoman en github




*/