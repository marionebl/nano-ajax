var assert = require('chai').assert;
var sinon = require('sinon');
var nano = require('../../');

describe('Header configuration', function(){
	before(function(){
		window = {};
		window.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
		window.XMLHttpRequest.onCreate = function(xhr) {
			request = xhr;
		};
	});

	after(function(){
		window.XMLHttpRequest.restore();
	});

	describe('when passing no custom headers configuration', function(){
		it('should initialize a request with default headers', function(done){
			var defaultHeaders = {
				'X-Requested-With': 'xmlhttprequest',
				'Content-Type': 'application/json'
			};

			nano('foo', 'GET', function(xhr){
				Object.keys(defaultHeaders).forEach(function(headerName){
					assert.propertyVal(request.requestHeaders, headerName, defaultHeaders[headerName]);
				});
				done();
			});

			request.respond(200);
		});
	});

	describe('when passing custom headers configuration', function(){
		it('should initialize a request with custom headers', function(done){
			var config = {
				'headers': {
					'accept': 'application/json',
					'X-Requested-With': 'nano-ajax',
					'Content-Type': 'text/html'
				}
			};

			nano('foo', 'GET', config, function(xhr){
				Object.keys(config.headers).forEach(function(headerName){
					assert.propertyVal(request.requestHeaders, headerName, config.headers[headerName]);
				});
				done();
			});

			request.respond(200);
		});
	});
});
