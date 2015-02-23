/**@preserve
cp-select-attrs.js*/

//get the attributies of the 'option' in a 'select' element and put them into an object
//usage: 
//<select cp-select-attrs="vm.theOjb" select-first="false" cp-select-attrs="vm.theOjb.myFunc()">
//<option value="val1" attr1="atrVal1" attr2="atrVal2">
//</select>
//result: theObj = {vale: val1, attr1: atrVal1, attr2: atrVal2}
//if select-first is omited, the default value is true
//cp-select-attrs will call that function when select is changed

cpApp.directive('cpSelectAttrs', function() {
    function link(scope, elem, attrs) {
        elem.bind('change', function() {
            getSelectionAttrs(scope, elem);
            scope.$apply();
            //call the function if part of the parameters
            if (attrs.cpSelectAttrsChange !== 'undefined') {
                scope.cpSelectAttrsChange();
                scope.$apply();
            }
        });
        if (attrs.selectFirst !== false) {
            getSelectionAttrs(scope, elem);
        }
    }

    function getSelectionAttrs(scope, elem) {
        var obj = {};
        obj.text = elem[0].selectedOptions[0].text;
        var attrs = (elem[0].selectedOptions[0].attributes);
        var length = attrs.length;
        for (var i = 0; i < length; i++) {
            obj[attrs[i].localName] = attrs[i].value;
        }
        scope.cpSelectAttrs = obj;
    }

    return {
        restrict: 'A',
        link: link,
        scope: {
            cpSelectAttrs: '=',
            selectFirst: '=',
            cpSelectAttrsChange: '&'
        }
    };
});
