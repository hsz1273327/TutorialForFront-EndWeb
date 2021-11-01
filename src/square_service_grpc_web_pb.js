/**
 * @fileoverview gRPC-Web generated client stub for squarerpc_service
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.squarerpc_service = require('./square_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.squarerpc_service.SquareServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.squarerpc_service.SquareServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.squarerpc_service.Message,
 *   !proto.squarerpc_service.Message>}
 */
const methodDescriptor_SquareService_square = new grpc.web.MethodDescriptor(
  '/squarerpc_service.SquareService/square',
  grpc.web.MethodType.UNARY,
  proto.squarerpc_service.Message,
  proto.squarerpc_service.Message,
  /**
   * @param {!proto.squarerpc_service.Message} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.squarerpc_service.Message.deserializeBinary
);


/**
 * @param {!proto.squarerpc_service.Message} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.squarerpc_service.Message)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.squarerpc_service.Message>|undefined}
 *     The XHR Node Readable Stream
 */
proto.squarerpc_service.SquareServiceClient.prototype.square =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/squarerpc_service.SquareService/square',
      request,
      metadata || {},
      methodDescriptor_SquareService_square,
      callback);
};


/**
 * @param {!proto.squarerpc_service.Message} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.squarerpc_service.Message>}
 *     Promise that resolves to the response
 */
proto.squarerpc_service.SquareServicePromiseClient.prototype.square =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/squarerpc_service.SquareService/square',
      request,
      metadata || {},
      methodDescriptor_SquareService_square);
};


module.exports = proto.squarerpc_service;

