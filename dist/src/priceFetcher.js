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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
//Defining this class to encapsulate API calls to fetch current prices and private API key
class PriceFetcher {
    constructor() {
        this.apiKey = "6aae6af9b99307bc18680e6029d62b6fe56daf919c8e18c521294661732e2c12";
        this.getPrices = (symbols) => __awaiter(this, void 0, void 0, function* () {
            return this.prepareResponse(this.getCurrentPriceURL(symbols));
        });
        this.getCurrentPriceURL = (symbols) => {
            return `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols.join(",")}&tsyms=USD`;
        };
        this.prepareResponse = (url) => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(url, {
                headers: {
                    authorization: `Apikey ${this.apiKey}`,
                },
            });
            const responseKeys = Object.keys(response.data);
            const prices = responseKeys.reduce((acc, key) => {
                if (response.data[key] && response.data[key]["USD"]) {
                    acc.set(key, response.data[key]["USD"]);
                }
                return acc;
            }, new Map());
            return prices;
        });
    }
}
exports.default = new PriceFetcher();
