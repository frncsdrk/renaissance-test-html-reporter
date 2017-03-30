// renaissance test html reporter
'use strict';

define(
    [
        'renaissance'
        , 'node_modules/renaissance-append-html/appendHTML'
    ]
    , function(renaissance, appendHTML) {
        // appendHTML drink
        appendHTML();

        function htmlReporter() {
            function appendWithTest(test, suiteNode) {
                //
            }
            function appendWithSuite(suite) {
                var body = document.getElementsByTagName('body')[0];
                var suiteDiv = document.createElement('div');
                body.appendChild(suiteDiv);
                
                var header = document.createElement('div');
                suiteDiv.appendChild(header);
                
                var suiteName = document.createElement('h3');
                suiteName.innerHTML = suite.name;
                header.appendChild(suiteName);

                var suiteBody = document.createElement('div');
                suiteDiv.appendChild(suiteBody);

                for (var i = 0; i < suite.tests.length; i++) {
                    var item = suite.tests[i];
                    var testDiv = document.createElement('div');
                    suiteBody.appendChild(testDiv);

                    testDiv.innerHTML = item.name + ' should ' + item.verb + ' ' + item.expectedResult;
                    if (item.result) {
                        testDiv.style.background = 'green';
                    }
                    else {
                        testDiv.style.background = 'red';
                    }
                }
            }

            this.report = function(specResults) {
                console.log(specResults);

                for (var i = 0; i < specResults.length; i++) {
                    appendWithSuite(specResults[i]);
                }
            };
        }

        return function() {
            renaissance.registerAdapter('htmlReporter', htmlReporter);
        }
    }
);
