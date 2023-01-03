"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeGraphOne = exports.likeGraphAll = void 0;
function findOne(r, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield r.findOne({
            where: {
                id: id,
            },
        });
    });
}
function find(r) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield r.find();
    });
}
function likeGraphAll(body, repository) {
    return __awaiter(this, void 0, void 0, function* () {
        if (body) {
            let bruts = yield find(repository);
            if (body.select) {
                const filterKeys = [...body.select];
                let brutKeys = Object.keys(bruts[0]);
                const netKeys = brutKeys.filter((key) => filterKeys.includes(key));
                let data = [];
                bruts.forEach((brut) => {
                    data.push(netKeys.reduce((accumulator, key) => {
                        accumulator[key] = brut[key];
                        return accumulator;
                    }, {}));
                });
                if (Object.keys(data[0]).length) {
                    return data;
                }
                else {
                    return bruts;
                }
            }
            else {
                return bruts;
            }
        }
        else {
            return yield repository.find();
        }
    });
}
exports.likeGraphAll = likeGraphAll;
function likeGraphOne(body, id, repository) {
    return __awaiter(this, void 0, void 0, function* () {
        if (body) {
            let brut = yield findOne(repository, id);
            if (body.select) {
                const filterKeys = [...body.select];
                let brutKeys = Object.keys(brut);
                const netKeys = brutKeys.filter((key) => filterKeys.includes(key));
                const data = netKeys.reduce((accumulator, key) => {
                    accumulator[key] = brut[key];
                    return accumulator;
                }, {});
                if (Object.keys(data).length) {
                    return data;
                }
                else {
                    return brut;
                }
            }
            else {
                return brut;
            }
        }
        else {
            return yield repository.findOne({
                where: {
                    id: id,
                },
            });
        }
    });
}
exports.likeGraphOne = likeGraphOne;
