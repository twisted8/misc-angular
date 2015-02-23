//display the conten only when visible on the screen
//cp-display-on-scroll="functionNameWhenScrolledTo()"
cpApp.directive('cpDisplayOnScroll', ['$window', 'Throttle', function($window, Throttle) {
    return function(scope, element, attr) {
        var elm = element[0];
        var displayOnScroll = Throttle(500, function() {
            displayIfVisible();        	
        });

        var displayIfVisible = function(){
            var winHeight =  $window.innerHeight + 100;
            if (this.pageYOffset >= (elm.offsetTop - winHeight)) {
                //console.log('*****on scroll');
                if(!scope.$$phase) {
                    scope.$apply(attr.cpDisplayOnScroll);
                }
                else
                {
                    scope.$eval(attr.cpDisplayOnScroll);
                }
                angular.element($window).off("scroll", displayOnScroll);
            }
        };

        angular.element($window).bind("scroll", displayOnScroll);
        displayIfVisible();
    };
} ]);