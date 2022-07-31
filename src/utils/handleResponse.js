"use strict";
exports.__esModule = true;
function default_1(response) {
    if (!response.ok) {
        return response.json().then(function (error) {
            console.error('API ERROR: ', error);
            throw new Error(error.message);
        });
    }
    return response.json();
}
exports["default"] = default_1;
;
