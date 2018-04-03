/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "5fb0f1d42b5466774bd8"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/app/index.js")(__webpack_require__.s = "./src/app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/actions/attack/index.js":
/***/ (function(module, exports, __webpack_require__) {

eval("var player = __webpack_require__(\"./src/app/player/index.js\");\r\n\r\n// calculate hits\r\nvar calcHits = (character, attackValue) => {\r\n    var characterObj;\r\n    for (var i in character) {\r\n        characterObj = true;\r\n    }\r\n\r\n    if (characterObj && attackValue) {\r\n        return character.health = character.health - attackValue;\r\n    } else {\r\n        throw 'character argument is ' + character + ' and attack value is ' + attackValue;\r\n    }\r\n};\r\n\r\n\r\n// character health check\r\nvar checkHealth = character => {\r\n    if (character.health <= 0) {\r\n        console.log(`${character.name} has died!`);\r\n    }\r\n};\r\n\r\n// hero attack\r\nvar attack = character => {\r\n\r\n    if (character != null) {\r\n        var atkMaxDmg = Math.max(character.strength);\r\n        var atkDmg = Math.round(Math.random() * character.strength);\r\n\r\n        if (atkDmg === atkMaxDmg) {\r\n            // critical attack does extra damage\r\n            return atkDmg + 5;\r\n        } else {\r\n            // basic attack damage lowest number to highest number - 1\r\n            return atkDmg;\r\n        }\r\n    } else {\r\n        throw 'hero is undefined or has not been created.';\r\n    }\r\n};\r\n\r\n// attack events\r\nvar attackAction = document.getElementById('hero-attack');\r\n\r\nattackAction.addEventListener('click', function () {\r\n    // hero will always attack first calculate the monster health first\r\n    // then carry out the monster attack\r\n    var heroAttack = attack(player.hero);\r\n    var monsterAttack = attack(player.monster);\r\n    \r\n    if (player.monster.health > 0) {\r\n        // hero attacks the monster first\r\n        calcHits(player.monster, heroAttack);\r\n        checkHealth(player.monster);\r\n    }\r\n    else if (player.hero.health > 0 && player.monster.health > 0) {\r\n        // if the monster is not dead the monster attacks the hero\r\n        calcHits(player.hero, monsterAttack);\r\n        checkHealth(player.hero);\r\n    }\r\n\r\n    console.log('hero attack ' + heroAttack);\r\n    console.log('monster attack ' + monsterAttack);\r\n\r\n});\r\n\r\nmodule.exports = attackAction;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL2FjdGlvbnMvYXR0YWNrL2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hY3Rpb25zL2F0dGFjay9pbmRleC5qcz9jNDQ0Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBwbGF5ZXIgPSByZXF1aXJlKCcuLi8uLi9wbGF5ZXInKTtcclxuXHJcbi8vIGNhbGN1bGF0ZSBoaXRzXHJcbnZhciBjYWxjSGl0cyA9IChjaGFyYWN0ZXIsIGF0dGFja1ZhbHVlKSA9PiB7XHJcbiAgICB2YXIgY2hhcmFjdGVyT2JqO1xyXG4gICAgZm9yICh2YXIgaSBpbiBjaGFyYWN0ZXIpIHtcclxuICAgICAgICBjaGFyYWN0ZXJPYmogPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFyYWN0ZXJPYmogJiYgYXR0YWNrVmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gY2hhcmFjdGVyLmhlYWx0aCA9IGNoYXJhY3Rlci5oZWFsdGggLSBhdHRhY2tWYWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgJ2NoYXJhY3RlciBhcmd1bWVudCBpcyAnICsgY2hhcmFjdGVyICsgJyBhbmQgYXR0YWNrIHZhbHVlIGlzICcgKyBhdHRhY2tWYWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vLyBjaGFyYWN0ZXIgaGVhbHRoIGNoZWNrXHJcbnZhciBjaGVja0hlYWx0aCA9IGNoYXJhY3RlciA9PiB7XHJcbiAgICBpZiAoY2hhcmFjdGVyLmhlYWx0aCA8PSAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7Y2hhcmFjdGVyLm5hbWV9IGhhcyBkaWVkIWApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gaGVybyBhdHRhY2tcclxudmFyIGF0dGFjayA9IGNoYXJhY3RlciA9PiB7XHJcblxyXG4gICAgaWYgKGNoYXJhY3RlciAhPSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGF0a01heERtZyA9IE1hdGgubWF4KGNoYXJhY3Rlci5zdHJlbmd0aCk7XHJcbiAgICAgICAgdmFyIGF0a0RtZyA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3Rlci5zdHJlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmIChhdGtEbWcgPT09IGF0a01heERtZykge1xyXG4gICAgICAgICAgICAvLyBjcml0aWNhbCBhdHRhY2sgZG9lcyBleHRyYSBkYW1hZ2VcclxuICAgICAgICAgICAgcmV0dXJuIGF0a0RtZyArIDU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gYmFzaWMgYXR0YWNrIGRhbWFnZSBsb3dlc3QgbnVtYmVyIHRvIGhpZ2hlc3QgbnVtYmVyIC0gMVxyXG4gICAgICAgICAgICByZXR1cm4gYXRrRG1nO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgJ2hlcm8gaXMgdW5kZWZpbmVkIG9yIGhhcyBub3QgYmVlbiBjcmVhdGVkLic7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBhdHRhY2sgZXZlbnRzXHJcbnZhciBhdHRhY2tBY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVyby1hdHRhY2snKTtcclxuXHJcbmF0dGFja0FjdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGhlcm8gd2lsbCBhbHdheXMgYXR0YWNrIGZpcnN0IGNhbGN1bGF0ZSB0aGUgbW9uc3RlciBoZWFsdGggZmlyc3RcclxuICAgIC8vIHRoZW4gY2Fycnkgb3V0IHRoZSBtb25zdGVyIGF0dGFja1xyXG4gICAgdmFyIGhlcm9BdHRhY2sgPSBhdHRhY2socGxheWVyLmhlcm8pO1xyXG4gICAgdmFyIG1vbnN0ZXJBdHRhY2sgPSBhdHRhY2socGxheWVyLm1vbnN0ZXIpO1xyXG4gICAgXHJcbiAgICBpZiAocGxheWVyLm1vbnN0ZXIuaGVhbHRoID4gMCkge1xyXG4gICAgICAgIC8vIGhlcm8gYXR0YWNrcyB0aGUgbW9uc3RlciBmaXJzdFxyXG4gICAgICAgIGNhbGNIaXRzKHBsYXllci5tb25zdGVyLCBoZXJvQXR0YWNrKTtcclxuICAgICAgICBjaGVja0hlYWx0aChwbGF5ZXIubW9uc3Rlcik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwbGF5ZXIuaGVyby5oZWFsdGggPiAwICYmIHBsYXllci5tb25zdGVyLmhlYWx0aCA+IDApIHtcclxuICAgICAgICAvLyBpZiB0aGUgbW9uc3RlciBpcyBub3QgZGVhZCB0aGUgbW9uc3RlciBhdHRhY2tzIHRoZSBoZXJvXHJcbiAgICAgICAgY2FsY0hpdHMocGxheWVyLmhlcm8sIG1vbnN0ZXJBdHRhY2spO1xyXG4gICAgICAgIGNoZWNrSGVhbHRoKHBsYXllci5oZXJvKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZygnaGVybyBhdHRhY2sgJyArIGhlcm9BdHRhY2spO1xyXG4gICAgY29uc29sZS5sb2coJ21vbnN0ZXIgYXR0YWNrICcgKyBtb25zdGVyQXR0YWNrKTtcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhdHRhY2tBY3Rpb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL2FjdGlvbnMvYXR0YWNrL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9hcHAvYWN0aW9ucy9hdHRhY2svaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app/actions/attack/index.js\n");

/***/ }),

/***/ "./src/app/actions/create-hero/index.js":
/***/ (function(module, exports, __webpack_require__) {

eval("var player = __webpack_require__(\"./src/app/player/index.js\");\r\nvar CreateCharacter = __webpack_require__(\"./src/app/constructors/create-character/index.js\");\r\n\r\n// global hero namespace\r\nvar heroCreateEvent = document.getElementById('create-hero');\r\n\r\nplayer.monster = new CreateCharacter('monster');\r\n\r\nheroCreateEvent.addEventListener('click', function () {\r\n    player.hero = new CreateCharacter();\r\n    debugger;\r\n    console.log(`name: ${player.hero.name}\r\n    health: ${player.hero.health}\r\n    strength: ${player.hero.strength}\r\n    initiative: ${player.hero.initiative}\r\n    level: ${player.hero.level}`);\r\n\r\n});\r\n\r\nmodule.exports = heroCreateEvent;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL2FjdGlvbnMvY3JlYXRlLWhlcm8vaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2FjdGlvbnMvY3JlYXRlLWhlcm8vaW5kZXguanM/ZGI0ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcGxheWVyID0gcmVxdWlyZSgnLi4vLi4vcGxheWVyJyk7XHJcbnZhciBDcmVhdGVDaGFyYWN0ZXIgPSByZXF1aXJlKCcuLi8uLi9jb25zdHJ1Y3RvcnMvY3JlYXRlLWNoYXJhY3RlcicpO1xyXG5cclxuLy8gZ2xvYmFsIGhlcm8gbmFtZXNwYWNlXHJcbnZhciBoZXJvQ3JlYXRlRXZlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLWhlcm8nKTtcclxuXHJcbnBsYXllci5tb25zdGVyID0gbmV3IENyZWF0ZUNoYXJhY3RlcignbW9uc3RlcicpO1xyXG5cclxuaGVyb0NyZWF0ZUV2ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcGxheWVyLmhlcm8gPSBuZXcgQ3JlYXRlQ2hhcmFjdGVyKCk7XHJcbiAgICBkZWJ1Z2dlcjtcclxuICAgIGNvbnNvbGUubG9nKGBuYW1lOiAke3BsYXllci5oZXJvLm5hbWV9XHJcbiAgICBoZWFsdGg6ICR7cGxheWVyLmhlcm8uaGVhbHRofVxyXG4gICAgc3RyZW5ndGg6ICR7cGxheWVyLmhlcm8uc3RyZW5ndGh9XHJcbiAgICBpbml0aWF0aXZlOiAke3BsYXllci5oZXJvLmluaXRpYXRpdmV9XHJcbiAgICBsZXZlbDogJHtwbGF5ZXIuaGVyby5sZXZlbH1gKTtcclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBoZXJvQ3JlYXRlRXZlbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL2FjdGlvbnMvY3JlYXRlLWhlcm8vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2FwcC9hY3Rpb25zL2NyZWF0ZS1oZXJvL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/app/actions/create-hero/index.js\n");

/***/ }),

/***/ "./src/app/actions/levelup/index.js":
/***/ (function(module, exports) {

eval("// level up\r\nconst levelUp = (stats) => {\r\n\r\n  const upgradeStats = stats.filter(function(stat) {\r\n\r\n\r\n  }); \r\n  debugger;\r\n\r\n    if (stats) {\r\n      return (\r\n        /*\r\n          a class // race modifier could be added to this leveling system\r\n          to give a different leveling buff / debuff\r\n        */\r\n        stats.strength += Math.round(stats.level / 0.5),\r\n        stats.maxHealth += Math.round(stats.level / 0.5),\r\n        stats.level += 1\r\n      );\r\n    }\r\n  };\r\n\r\n  module.exports = levelUp;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL2FjdGlvbnMvbGV2ZWx1cC9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hcHAvYWN0aW9ucy9sZXZlbHVwL2luZGV4LmpzPzE0NGYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGV2ZWwgdXBcclxuY29uc3QgbGV2ZWxVcCA9IChzdGF0cykgPT4ge1xyXG5cclxuICBjb25zdCB1cGdyYWRlU3RhdHMgPSBzdGF0cy5maWx0ZXIoZnVuY3Rpb24oc3RhdCkge1xyXG5cclxuXHJcbiAgfSk7IFxyXG4gIGRlYnVnZ2VyO1xyXG5cclxuICAgIGlmIChzdGF0cykge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICBhIGNsYXNzIC8vIHJhY2UgbW9kaWZpZXIgY291bGQgYmUgYWRkZWQgdG8gdGhpcyBsZXZlbGluZyBzeXN0ZW1cclxuICAgICAgICAgIHRvIGdpdmUgYSBkaWZmZXJlbnQgbGV2ZWxpbmcgYnVmZiAvIGRlYnVmZlxyXG4gICAgICAgICovXHJcbiAgICAgICAgc3RhdHMuc3RyZW5ndGggKz0gTWF0aC5yb3VuZChzdGF0cy5sZXZlbCAvIDAuNSksXHJcbiAgICAgICAgc3RhdHMubWF4SGVhbHRoICs9IE1hdGgucm91bmQoc3RhdHMubGV2ZWwgLyAwLjUpLFxyXG4gICAgICAgIHN0YXRzLmxldmVsICs9IDFcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBtb2R1bGUuZXhwb3J0cyA9IGxldmVsVXA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL2FjdGlvbnMvbGV2ZWx1cC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYXBwL2FjdGlvbnMvbGV2ZWx1cC9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app/actions/levelup/index.js\n");

/***/ }),

/***/ "./src/app/constructors/create-character/index.js":
/***/ (function(module, exports) {

eval("// create hero constructor\r\n// create character es6 example\r\nclass CreateCharacter {\r\n    constructor(name) {    \r\n      this.name = name || 'example'; // this.name will fail as this is now its own function\r\n      this.health = 10;\r\n      this.maxHealth = Math.max(this.health);\r\n      this.strength = 10;\r\n      this.level = 1;\r\n      this.initiative = 1;      \r\n    };\r\n  };\r\n\r\n  module.exports = CreateCharacter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL2NvbnN0cnVjdG9ycy9jcmVhdGUtY2hhcmFjdGVyL2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb25zdHJ1Y3RvcnMvY3JlYXRlLWNoYXJhY3Rlci9pbmRleC5qcz8xNTY3Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNyZWF0ZSBoZXJvIGNvbnN0cnVjdG9yXHJcbi8vIGNyZWF0ZSBjaGFyYWN0ZXIgZXM2IGV4YW1wbGVcclxuY2xhc3MgQ3JlYXRlQ2hhcmFjdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHsgICAgXHJcbiAgICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgJ2V4YW1wbGUnOyAvLyB0aGlzLm5hbWUgd2lsbCBmYWlsIGFzIHRoaXMgaXMgbm93IGl0cyBvd24gZnVuY3Rpb25cclxuICAgICAgdGhpcy5oZWFsdGggPSAxMDtcclxuICAgICAgdGhpcy5tYXhIZWFsdGggPSBNYXRoLm1heCh0aGlzLmhlYWx0aCk7XHJcbiAgICAgIHRoaXMuc3RyZW5ndGggPSAxMDtcclxuICAgICAgdGhpcy5sZXZlbCA9IDE7XHJcbiAgICAgIHRoaXMuaW5pdGlhdGl2ZSA9IDE7ICAgICAgXHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0gQ3JlYXRlQ2hhcmFjdGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FwcC9jb25zdHJ1Y3RvcnMvY3JlYXRlLWNoYXJhY3Rlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYXBwL2NvbnN0cnVjdG9ycy9jcmVhdGUtY2hhcmFjdGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/app/constructors/create-character/index.js\n");

/***/ }),

/***/ "./src/app/index.js":
/***/ (function(module, exports, __webpack_require__) {

eval("const CreateCharacter = __webpack_require__(\"./src/app/constructors/create-character/index.js\");\r\n\r\n// actions\r\nconst heroCreateEvent = __webpack_require__(\"./src/app/actions/create-hero/index.js\");\r\nconst attackAction = __webpack_require__(\"./src/app/actions/attack/index.js\");\r\nconst levelUp = __webpack_require__(\"./src/app/actions/levelup/index.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL2luZGV4LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9pbmRleC5qcz83YWZjIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENyZWF0ZUNoYXJhY3RlciA9IHJlcXVpcmUoJy4vY29uc3RydWN0b3JzL2NyZWF0ZS1jaGFyYWN0ZXInKTtcclxuXHJcbi8vIGFjdGlvbnNcclxuY29uc3QgaGVyb0NyZWF0ZUV2ZW50ID0gcmVxdWlyZSgnLi9hY3Rpb25zL2NyZWF0ZS1oZXJvJyk7XHJcbmNvbnN0IGF0dGFja0FjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9ucy9hdHRhY2snKTtcclxuY29uc3QgbGV2ZWxVcCA9IHJlcXVpcmUoJy4vYWN0aW9ucy9sZXZlbHVwJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9hcHAvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app/index.js\n");

/***/ }),

/***/ "./src/app/player/index.js":
/***/ (function(module, exports) {

eval("let player = {};\r\nmodule.exports = player;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwL3BsYXllci9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hcHAvcGxheWVyL2luZGV4LmpzP2ViZjIiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHBsYXllciA9IHt9O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHBsYXllcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL3BsYXllci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYXBwL3BsYXllci9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/app/player/index.js\n");

/***/ })

/******/ });