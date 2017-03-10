angular.module("ABMangularPHP").directive("utnDirectivaSaludar",function(){
    return {
        template:"<h1>hola utn Fra</h1>" ,
        restrict:'AEC',
        replace: true  
    }; 
});

angular.module("ABMangularPHP").directive("utnBotonMenu",function(){
    return {
        
        templateUrl:"template/templateBoton.html" ,
        restrict:'AEC',
        replace: true ,
        scope:{
            titulo:"@"
        }
    }; 
});
angular.module("ABMangularPHP").directive("utnTitulo",function(){
    return {
        
        templateUrl:"template/templateTitulo.html" ,
        restrict:'AEC',
        replace: true ,
        scope:{
            titulo:"@"
        }
    }; 
});








/*(function(){
	'use strict';
	angular
		.module('ABMangularPHP')
		.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);
})();*/