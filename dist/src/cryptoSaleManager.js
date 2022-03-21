"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSALE = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
function fetchSALE(amount, srcDecimal, desDecimal, srcPrice, ethPrice, ETHSALErate) {
    const srcPriceNew = new bignumber_js_1.default(srcPrice);
    const ethPriceNew = new bignumber_js_1.default(ethPrice);
    const amountNew = new bignumber_js_1.default(amount);
    const ETHSALErateNew = new bignumber_js_1.default(ETHSALErate);
    //Defining parse values to ensure accurate calculations considering Wei/Satoshi for ETH/BTC and respectively for DOGE/SALE-wei
    const weiParser = getDecimalParser(18);
    const srcParser = getDecimalParser(srcDecimal);
    const desParser = getDecimalParser(desDecimal);
    //Step1: Calculate value of 1 Source-Curreny-Wei to Eth-Wei ratio
    //oneSrcWeiToEthWei = srcPrice/ethPrice x 10^18 /10^srcDecimal
    const oneSrcWeiToEthWei = srcPriceNew.dividedBy(ethPriceNew).multipliedBy(weiParser).dividedBy(srcParser);
    //Step2: Calculate totalEthWei in given amount; 
    //totalEthWei = oneSrcWeiToEthWei x amount x 10^srcDecimal
    const totalEthWei = oneSrcWeiToEthWei.multipliedBy(amountNew).multipliedBy(srcParser);
    //Step3: Calculate 1 Eth-wei to SALE(Destination-Currency)-wei ratio
    //oneEthWeiToDesWei = ETHSALErate x 10^desDecimal /10^18
    const oneEthWeiToDesWei = ETHSALErateNew.multipliedBy(desParser);
    //Step4: Find total SALE-wei and calculate SALE from it.
    //result = totalEthWei x oneEthWeiToDesWei / 10^desDecimal
    const result = oneEthWeiToDesWei.multipliedBy(totalEthWei).dividedBy(desParser).dividedBy(weiParser);
    return roundDown(result.toString(), desDecimal);
}
exports.fetchSALE = fetchSALE;
function getDecimalParser(decimal) {
    return new bignumber_js_1.default('10').pow(decimal).toString();
}
function roundDown(input, desDecimal) {
    if (input != null) {
        var SplitChars = '.';
        if (input.indexOf(SplitChars) >= 0) {
            var DtlStr = input.split(SplitChars);
            var num = DtlStr[0];
            var dec = DtlStr[1];
            var result;
            if (dec.length < desDecimal) {
                result = num + "." + paddedDecimalValue(dec, desDecimal - dec.length);
            }
            else {
                result = num + "." + dec.substring(0, desDecimal);
            }
            return result;
        }
    }
    return input;
}
function paddedDecimalValue(dec, x) {
    for (let i = 0; i < x; i++) {
        dec = dec + '0';
    }
    return dec;
}
