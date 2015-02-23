/**@preserve
cp-options-deisabled.js*/
//from: http://stackoverflow.com/questions/16202254/ng-options-with-disabled-rows/20790905#20790905
cpApp.directive('cpOptionsDisabled', ['$parse', function($parse) {
    var disableOptions = function(scope, attr, element, data,
        fnDisableIfTrue) {
        // refresh the disabled options in the select element.
        var options = element.find('option');
        for (var pos = 0, index = 0; pos < options.length; pos++) {
            var elem = angular.element(options[pos]);
            if (elem.val() != '?') {
                var locals = {};
                locals[attr] = data[index];
                elem.attr('disabled', fnDisableIfTrue(scope, locals));
                index++;
            }
        }
    };
    return {
        priority: 0,
        require: 'ngModel',
        link: function(scope, iElement, iAttrs) {
            // parse expression and build array of disabled options
            var expElements = iAttrs.cpOptionsDisabled.match(
                /^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
            var attrToWatch = expElements[3];
            var fnDisableIfTrue = $parse(expElements[1]);
            scope.$watch(attrToWatch, function(newValue) {
                if (newValue)
                    disableOptions(scope, expElements[2], iElement,
                        newValue, fnDisableIfTrue);
            }, true);
            // handle model updates properly
            scope.$watch(iAttrs.ngModel, function(newValue) {
                var disOptions = $parse(attrToWatch)(scope);
                if (newValue)
                    disableOptions(scope, expElements[2], iElement,
                        disOptions, fnDisableIfTrue);
            });
        }
    };
}]);
