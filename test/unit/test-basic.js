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


