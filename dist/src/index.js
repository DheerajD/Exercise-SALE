"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Currency = void 0;
const readline = __importStar(require("readline"));
const cryptoSaleManager_1 = require("./cryptoSaleManager");
const priceFetcher_1 = __importDefault(require("./priceFetcher"));
//Driver code
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rl = readline.createInterface({
            input: process.stdin,
        });
        const inputs = [];
        rl.on('line', (line) => {
            inputs.push(line);
        });
        rl.on('close', () => __awaiter(this, void 0, void 0, function* () {
            const processedInput = yield processInput(inputs);
            for (const record of processedInput.conversionRequests) {
                const buyAmount = (0, cryptoSaleManager_1.fetchSALE)(record.purchaseAmount, currencyDecimals[record.purchaseCurrency], record.saleDecimal, processedInput.currencyPrices.get(record.purchaseCurrency), processedInput.currencyPrices.get(Currency.ETH), record.ethToSaleConversionRate);
                console.log(buyAmount);
            }
        }));
    });
}
var Currency;
(function (Currency) {
    Currency["BTC"] = "BTC";
    Currency["ETH"] = "ETH";
    Currency["DOGE"] = "DOGE";
})(Currency = exports.Currency || (exports.Currency = {}));
//Assuming ETH to have 18 decimal places, BTC and DOGE to have 8 decimal places
const currencyDecimals = {
    [Currency.BTC]: 8,
    [Currency.ETH]: 18,
    [Currency.DOGE]: 8
};
//Reads the input file and fetches SALE quantity as per the input
function processInput(inputs) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const currencyPrices = new Map();
        const conversionRequests = [];
        //Fetch current API from priceFetcher if first line in input.txt file is "CURRENT"
        if (inputs[0].trim().toLowerCase() === 'current') {
            const currentPrices = yield priceFetcher_1.default.getPrices([Currency.BTC, Currency.ETH, Currency.DOGE]);
            currencyPrices.set(Currency.BTC, (_a = currentPrices.get(Currency.BTC)) === null || _a === void 0 ? void 0 : _a.toString());
            currencyPrices.set(Currency.ETH, (_b = currentPrices.get(Currency.ETH)) === null || _b === void 0 ? void 0 : _b.toString());
            currencyPrices.set(Currency.DOGE, (_c = currentPrices.get(Currency.DOGE)) === null || _c === void 0 ? void 0 : _c.toString());
        }
        else { //Else use given values
            const prices = inputs[0].split(" ");
            currencyPrices.set(Currency.BTC, prices[0]);
            currencyPrices.set(Currency.ETH, prices[1]);
            currencyPrices.set(Currency.DOGE, prices[2]);
        }
        for (let i = 1; i < inputs.length; i++) {
            const splittedInput = inputs[i].split(" ");
            conversionRequests.push({
                ethToSaleConversionRate: splittedInput[0],
                saleDecimal: parseInt(splittedInput[1]),
                purchaseCurrency: splittedInput[2],
                purchaseAmount: splittedInput[3]
            });
        }
        return {
            currencyPrices,
            conversionRequests
        };
    });
}
main();
