// renaissance test html reporter
'use strict';

define(
    [
        'renaissance'
    ]
    , function(renaissance, appendHTML) {
        function htmlReporter() {
            function appendWithTest(test, testNode) {
                // console.log(test);
                
                var nameSpan = document.createElement('span');
                nameSpan.classList.add('test-name');
                nameSpan.innerHTML = test.name;
                testNode.appendChild(nameSpan);

                testNode.innerHTML += ' should ';

                var verbSpan = document.createElement('span');
                verbSpan.classList.add('test-verb');
                verbSpan.innerHTML = test.verb;
                testNode.appendChild(verbSpan);

                testNode.innerHTML += ' ';

                var expectedResultSpan = document.createElement('span');
                expectedResultSpan.classList.add('test-expected-result');
                expectedResultSpan.innerHTML = String(test.expectedResult);
                testNode.appendChild(expectedResultSpan);

                if (test.result) {
                    testNode.classList.add('success');
                }
                else {
                    testNode.classList.add('error');
                }
            }
            function appendWithSuite(suite) {
                var body = document.getElementsByTagName('body')[0];
                var suiteDiv = document.createElement('div');
                suiteDiv.classList.add('suite-container')
                body.appendChild(suiteDiv);
                
                var header = document.createElement('div');
                header.classList.add('suite-header');
                suiteDiv.appendChild(header);
                
                var suiteName = document.createElement('h3');
                suiteName.innerHTML = suite.name;
                header.appendChild(suiteName);

                var suiteBody = document.createElement('div');
                suiteDiv.appendChild(suiteBody);

                for (var i = 0; i < suite.tests.length; i++) {
                    var item = suite.tests[i];
                    var testDiv = document.createElement('div');
                    testDiv.classList.add('test-container');
                    suiteBody.appendChild(testDiv);

                    appendWithTest(item, testDiv);
                }
            }

            this.report = function(specResults) {
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
