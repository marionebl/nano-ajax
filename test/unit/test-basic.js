var assert = require('chai').assert;
var sinon = require('sinon');
var nano = require('../../');

describe('Basic usage', function(){
	var request = null;

	beforeEach(function(){
		window = {};
		window.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
		window.XMLHttpRequest.onCreate = function(xhr) {
			request = xhr;
		};
	});

	afterEach(function(){
		window.XMLHttpRequest.restore();
	});

	describe('when called with url as first parameter', function(){
		it('should initialize a GET request', function(done){
			nano('foo', function(){
				assert.equal(request.method, 'GET');
				done();
			});

			request.respond(200);
		});
	});

	describe('when called with "GET" as second parameter', function(){
		it('should initialize a GET request', function(done){
			nano('foo', 'GET', function(){
				assert.equal(request.method, 'GET');
				done();
			});

			request.respond(200);
		});
	});

	describe('when called with "POST" as second parameter', function(){
		it('should initialize a POST request', function(done){
			nano('foo', 'POST', function(){
				assert.equal(request.method, 'POST');
				done();
			});

			request.respond(200);
		});
	});

	describe('when called with "PUT" as second parameter', function(){
		it('should initialize a PUT request', function(done){
			nano('foo', 'PUT', function(){
				assert.equal(request.method, 'PUT');
				done();
			});

			request.respond(200);
		});
	});

	describe('when called with "DELETE" as second parameter', function(){
		it('should initialize a DELETE request', function(done){
			nano('foo', 'DELETE', function(){
				assert.equal(request.method, 'DELETE');
				done();
			});

			request.respond(200);
		});
	});

	describe('when called with "HEAD" as second parameter', function(){
		it('should initialize a HEAD request', function(done){
			nano('foo', 'HEAD', function(){
				assert.equal(request.method, 'HEAD');
				done();
			});

			request.respond(200);
		});
	});
});

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
			var headers = {
				'accept': 'application/json',
				'X-Requested-With': 'nano-ajax',
				'Content-Type': 'text/html'
			};

			nano('foo', 'GET', headers, function(xhr){
				Object.keys(headers).forEach(function(headerName){
					assert.propertyVal(request.requestHeaders, headerName, headers[headerName]);
				});
				done();
			});

			request.respond(200);
		});
	});
});

describe('Request body', function(){

});

describe('Events', function(){

});
