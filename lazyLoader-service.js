cpApp.factory('lazyLoader', ['$rootScope', '$q', '$compile', function($rootScope, $q, $compile) {

    return {
        load: load,
        compileDirective: compileDirective
    };

    //lazy load js files for services or directives
    //paramters: 
    //  filePath: the relative location of the js file.
    function load(filePath) {
        var deferred = $q.defer(filePath);
        // download the javascript file
        var script = document.createElement('script');
        script.src = filePath;
        script.onload = function() {
            $rootScope.$apply(deferred.resolve);
        };
        document.getElementsByTagName('head')[0].appendChild(script);
        return deferred.promise;
    }

    //compile a directive
    //parameters:
    //  directiveElement: the html that creates the directive. (ex. <my-directive param="val"></my-directive>)
    // (this can be useful if you don't want to inject the $rootScope and $compile on your current directive/service)
    function compileDirective(directiveElement) {
        return $compile(directiveElement)($rootScope);
    }

}]);
