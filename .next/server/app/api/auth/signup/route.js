/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/signup/route";
exports.ids = ["app/api/auth/signup/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/signup/route.ts":
/*!**************************************!*\
  !*** ./app/api/auth/signup/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();\nconst SALT_ROUNDS = 10;\n// Validate email format\nconst isValidEmail = (email)=>{\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    return emailRegex.test(email);\n};\n// Create a secure JWT token using jose\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { firstName, lastName, signupEmail, signupPassword, confirmPassword, terms } = body;\n        // Validate inputs\n        if (!firstName || !lastName || !signupEmail || !signupPassword || !confirmPassword) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Tous les champs sont requis\"\n            }, {\n                status: 400\n            });\n        }\n        if (!isValidEmail(signupEmail)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Format d'email invalide\"\n            }, {\n                status: 400\n            });\n        }\n        if (signupPassword.length < 8) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Le mot de passe doit contenir au moins 8 caractères\"\n            }, {\n                status: 400\n            });\n        }\n        if (signupPassword !== confirmPassword) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Les mots de passe ne correspondent pas\"\n            }, {\n                status: 400\n            });\n        }\n        if (!terms) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Vous devez accepter les conditions d'utilisation\"\n            }, {\n                status: 400\n            });\n        }\n        // Check if user already exists\n        const existingUser = await prisma.user.findUnique({\n            where: {\n                email: signupEmail\n            }\n        });\n        if (existingUser) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Cet email est déjà utilisé\"\n            }, {\n                status: 409\n            });\n        }\n        // Hash password\n        const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hash(signupPassword, SALT_ROUNDS);\n        // Create user\n        const newUser = await prisma.user.create({\n            data: {\n                firstName,\n                lastName,\n                email: signupEmail,\n                password: hashedPassword\n            }\n        });\n        // Create session token with jose\n        // Return successful response\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            message: \"Compte créé avec succès\",\n            user: {\n                id: newUser.id,\n                email: newUser.email,\n                firstName: newUser.firstName,\n                lastName: newUser.lastName\n            }\n        });\n    } catch (error) {\n        console.error(\"Sign up error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Une erreur est survenue lors de l'inscription\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcaHBcXERlc2t0b3BcXG1haW5cXGdoaWxhc1xcSlNBQVxcYXBwXFxhcGlcXGF1dGhcXHNpZ251cFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXHJcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXHJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCJcclxuXHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KClcclxuY29uc3QgU0FMVF9ST1VORFMgPSAxMFxyXG5cclxuXHJcbi8vIFZhbGlkYXRlIGVtYWlsIGZvcm1hdFxyXG5jb25zdCBpc1ZhbGlkRW1haWwgPSAoZW1haWw6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskL1xyXG4gIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpXHJcbn1cclxuXHJcbi8vIENyZWF0ZSBhIHNlY3VyZSBKV1QgdG9rZW4gdXNpbmcgam9zZVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6TmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXHJcbiAgICBjb25zdCB7IGZpcnN0TmFtZSwgbGFzdE5hbWUsIHNpZ251cEVtYWlsLCBzaWdudXBQYXNzd29yZCwgY29uZmlybVBhc3N3b3JkLCB0ZXJtcyB9ID0gYm9keVxyXG4gICAgXHJcbiAgICAvLyBWYWxpZGF0ZSBpbnB1dHNcclxuICAgIGlmICghZmlyc3ROYW1lIHx8ICFsYXN0TmFtZSB8fCAhc2lnbnVwRW1haWwgfHwgIXNpZ251cFBhc3N3b3JkIHx8ICFjb25maXJtUGFzc3dvcmQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiVG91cyBsZXMgY2hhbXBzIHNvbnQgcmVxdWlzXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNWYWxpZEVtYWlsKHNpZ251cEVtYWlsKSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJGb3JtYXQgZCdlbWFpbCBpbnZhbGlkZVwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2lnbnVwUGFzc3dvcmQubGVuZ3RoIDwgOCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJMZSBtb3QgZGUgcGFzc2UgZG9pdCBjb250ZW5pciBhdSBtb2lucyA4IGNhcmFjdMOocmVzXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzaWdudXBQYXNzd29yZCAhPT0gY29uZmlybVBhc3N3b3JkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkxlcyBtb3RzIGRlIHBhc3NlIG5lIGNvcnJlc3BvbmRlbnQgcGFzXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGVybXMpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiVm91cyBkZXZleiBhY2NlcHRlciBsZXMgY29uZGl0aW9ucyBkJ3V0aWxpc2F0aW9uXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIHVzZXIgYWxyZWFkeSBleGlzdHNcclxuICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBlbWFpbDogc2lnbnVwRW1haWwgfSxcclxuICAgIH0pXHJcblxyXG4gICAgaWYgKGV4aXN0aW5nVXNlcikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJDZXQgZW1haWwgZXN0IGTDqWrDoCB1dGlsaXPDqVwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwOSB9XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYXNoIHBhc3N3b3JkXHJcbiAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHNpZ251cFBhc3N3b3JkLCBTQUxUX1JPVU5EUylcclxuXHJcbiAgICAvLyBDcmVhdGUgdXNlclxyXG4gICAgY29uc3QgbmV3VXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBmaXJzdE5hbWUsXHJcbiAgICAgICAgbGFzdE5hbWUsXHJcbiAgICAgICAgZW1haWw6IHNpZ251cEVtYWlsLFxyXG4gICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcclxuICAgICAgfSxcclxuICAgIH0pXHJcblxyXG4gICAgLy8gQ3JlYXRlIHNlc3Npb24gdG9rZW4gd2l0aCBqb3NlXHJcbiAgIFxyXG5cclxuICAgIC8vIFJldHVybiBzdWNjZXNzZnVsIHJlc3BvbnNlXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBtZXNzYWdlOiBcIkNvbXB0ZSBjcsOpw6kgYXZlYyBzdWNjw6hzXCIsXHJcbiAgICAgIHVzZXI6IHtcclxuICAgICAgICBpZDogbmV3VXNlci5pZCxcclxuICAgICAgICBlbWFpbDogbmV3VXNlci5lbWFpbCxcclxuICAgICAgICBmaXJzdE5hbWU6IG5ld1VzZXIuZmlyc3ROYW1lLFxyXG4gICAgICAgIGxhc3ROYW1lOiBuZXdVc2VyLmxhc3ROYW1lLFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIlNpZ24gdXAgZXJyb3I6XCIsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIlVuZSBlcnJldXIgZXN0IHN1cnZlbnVlIGxvcnMgZGUgbCdpbnNjcmlwdGlvblwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKVxyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJQcmlzbWFDbGllbnQiLCJiY3J5cHQiLCJwcmlzbWEiLCJTQUxUX1JPVU5EUyIsImlzVmFsaWRFbWFpbCIsImVtYWlsIiwiZW1haWxSZWdleCIsInRlc3QiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJqc29uIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJzaWdudXBFbWFpbCIsInNpZ251cFBhc3N3b3JkIiwiY29uZmlybVBhc3N3b3JkIiwidGVybXMiLCJzdWNjZXNzIiwibWVzc2FnZSIsInN0YXR1cyIsImxlbmd0aCIsImV4aXN0aW5nVXNlciIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJoYXNoZWRQYXNzd29yZCIsImhhc2giLCJuZXdVc2VyIiwiY3JlYXRlIiwiZGF0YSIsInBhc3N3b3JkIiwiaWQiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/signup/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5Chp%5CDesktop%5Cmain%5Cghilas%5CJSAA%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chp%5CDesktop%5Cmain%5Cghilas%5CJSAA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5Chp%5CDesktop%5Cmain%5Cghilas%5CJSAA%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chp%5CDesktop%5Cmain%5Cghilas%5CJSAA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_hp_Desktop_main_ghilas_JSAA_app_api_auth_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/signup/route.ts */ \"(rsc)/./app/api/auth/signup/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/signup/route\",\n        pathname: \"/api/auth/signup\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/signup/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\hp\\\\Desktop\\\\main\\\\ghilas\\\\JSAA\\\\app\\\\api\\\\auth\\\\signup\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_hp_Desktop_main_ghilas_JSAA_app_api_auth_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGc2lnbnVwJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGc2lnbnVwJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRnNpZ251cCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNocCU1Q0Rlc2t0b3AlNUNtYWluJTVDZ2hpbGFzJTVDSlNBQSU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDaHAlNUNEZXNrdG9wJTVDbWFpbiU1Q2doaWxhcyU1Q0pTQUEmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzRCO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEZXNrdG9wXFxcXG1haW5cXFxcZ2hpbGFzXFxcXEpTQUFcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXHNpZ251cFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9zaWdudXAvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL3NpZ251cFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9zaWdudXAvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEZXNrdG9wXFxcXG1haW5cXFxcZ2hpbGFzXFxcXEpTQUFcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXHNpZ251cFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5Chp%5CDesktop%5Cmain%5Cghilas%5CJSAA%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chp%5CDesktop%5Cmain%5Cghilas%5CJSAA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5Chp%5CDesktop%5Cmain%5Cghilas%5CJSAA%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Chp%5CDesktop%5Cmain%5Cghilas%5CJSAA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();