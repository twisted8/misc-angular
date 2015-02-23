/**@preserve
cp-required-field.js*/
cpApp.directive('cpRequiredField', ['$compile', function($compile){

	function link(scope, element, attrs) {
		scope.$watch('cpRequiredField', function(newVal) {
			if (newVal === true) {
				element.addClass('required-invalid');
				$(element).scrollTo({speed:500, center: true});
				var messageBox = $compile('<div class="required-warning" ng-show="cpRequiredField"><span>' + attrs.message + '</span></div>');
				$(element).before(messageBox(scope));
			}
			else {
				element.removeClass('required-invalid');
			}
		});
	}

	return {
		restrict: 'A',
		link: link,
		scope: {
			cpRequiredField: '='
		}

	};

}]);


//remove specified character using regef
//exmple: <input ng-model='vm.name' cp-remove-special='["//]'
//this will remove quote(")  and slash(/) (double slash for scaping)
cpApp.directive('cpRemoveSpecial', function(){
   return {
     require: 'ngModel',
    
     link: function(scope, element, attrs, modelCtrl) {
       var regExVar = attrs.cpRemoveSpecial;
       
       modelCtrl.$parsers.push(function (inputValue) {
         var regEx= new RegExp(regExVar, 'g');
         var transformedInput = inputValue.toLowerCase().replace(regEx, ''); 

         if (transformedInput!=inputValue) {
           modelCtrl.$setViewValue(transformedInput);
           modelCtrl.$render();
         }         

         return transformedInput;         
       });
     }
   };
});