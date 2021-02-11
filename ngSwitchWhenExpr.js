/**
 * Created by mallowigi on 22/01/15.
 */
angular.module('mallowigi.ngUtils')
  .config(function ($provide) {
    'use strict';
    $provide.decorator('ngSwitchWhenDirective', function ($delegate) {

      angular.forEach($delegate, function (ngSwitchWhen) {

        // override default compile method since it has already closed over
        // the directive definition's link function
        ngSwitchWhen.compile = function () {

          return function (scope, element, attrs, ctrl, $transclude) {
            var whenCase = scope.$eval(attrs.ngSwitchWhen);
            ctrl.cases['!' + whenCase] = (ctrl.cases['!' + whenCase] || []);
            ctrl.cases['!' + whenCase].push({transclude: $transclude, element: element});
          };
        };
      });

      return $delegate;
    });
  });
