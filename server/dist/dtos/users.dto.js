"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CreateUserDto: function() {
        return CreateUserDto;
    },
    LoginDto: function() {
        return LoginDto;
    },
    UpdateUserDto: function() {
        return UpdateUserDto;
    }
});
const _classvalidator = require("class-validator");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateUserDto = class CreateUserDto {
    constructor(){
        _define_property(this, "FirstName", void 0);
        _define_property(this, "LastName", void 0);
        _define_property(this, "Email", void 0);
        _define_property(this, "Password", void 0);
    }
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.MinLength)(2),
    (0, _classvalidator.MaxLength)(30),
    _ts_metadata("design:type", String)
], CreateUserDto.prototype, "FirstName", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.MinLength)(2),
    (0, _classvalidator.MaxLength)(30),
    _ts_metadata("design:type", String)
], CreateUserDto.prototype, "LastName", void 0);
_ts_decorate([
    (0, _classvalidator.IsEmail)(),
    _ts_metadata("design:type", String)
], CreateUserDto.prototype, "Email", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.MinLength)(6),
    (0, _classvalidator.MaxLength)(32),
    _ts_metadata("design:type", String)
], CreateUserDto.prototype, "Password", void 0);
let LoginDto = class LoginDto {
    constructor(){
        _define_property(this, "Email", void 0);
        _define_property(this, "Password", void 0);
    }
};
_ts_decorate([
    (0, _classvalidator.IsEmail)(),
    _ts_metadata("design:type", String)
], LoginDto.prototype, "Email", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.MinLength)(6),
    (0, _classvalidator.MaxLength)(32),
    _ts_metadata("design:type", String)
], LoginDto.prototype, "Password", void 0);
let UpdateUserDto = class UpdateUserDto {
    constructor(){
        _define_property(this, "password", void 0);
    }
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.MinLength)(6),
    (0, _classvalidator.MaxLength)(32),
    _ts_metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);

//# sourceMappingURL=users.dto.js.map