"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.LoginDto = exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { FirstName: { required: true, type: () => String }, LastName: { required: true, type: () => String }, Email: { required: true, type: () => String }, Password: { required: true, type: () => String } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The first name of the user.',
        example: 'John',
        minLength: 2,
        maxLength: 30,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "FirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The last name of the user.',
        example: 'Doe',
        minLength: 2,
        maxLength: 30,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "LastName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user.',
        example: 'john.doe@example.com',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The password of the user.',
        example: 'password123',
        minLength: 6,
        maxLength: 32,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Password", void 0);
class LoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { Email: { required: true, type: () => String }, Password: { required: true, type: () => String } };
    }
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user.',
        example: 'john.doe@example.com',
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "Email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The password of the user.',
        example: 'password123',
        minLength: 6,
        maxLength: 32,
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "Password", void 0);
class UpdateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { FirstName: { required: true, type: () => String }, LastName: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The new first name of the user.',
        example: 'John',
        minLength: 2,
        maxLength: 30,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "FirstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The new last name of the user.',
        example: 'Doe',
        minLength: 2,
        maxLength: 30,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "LastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'The new password of the user.',
        example: 'password123',
        minLength: 6,
        maxLength: 32,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
//# sourceMappingURL=users.dto.js.map