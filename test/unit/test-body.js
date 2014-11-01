var assert = require('chai').assert;
var sinon = require('sinon');
var nano = require('../../');

describe('Request body', function(){
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

	describe('when called with a data object', function(){
		it('should initialize a request with body', function(done){
			var data = { foo: 'bar' };

			nano('foo', 'POST', { data: data }, function(){
				assert.deepEqual(request.requestBody, data);
				done();
			});

			request.respond(200);
		});
	});
});
