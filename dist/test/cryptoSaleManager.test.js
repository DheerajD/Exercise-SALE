"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoSaleManager_1 = require("../src/cryptoSaleManager");
test('Should work for ETH-SALE', () => {
    const output = (0, cryptoSaleManager_1.fetchSALE)("3.5", 18, 3, "138.8911", "138.8911", "1.5");
    expect(output.toString()).toBe("5.250");
    const output2 = (0, cryptoSaleManager_1.fetchSALE)("3.5", 18, 1, "138.8911", "138.8911", "1.5");
    expect(output2.toString()).toBe("5.2");
});
test('Should work for BTC-SALE', () => {
    const output = (0, cryptoSaleManager_1.fetchSALE)("3.5", 8, 3, "3825.281112", "138.8911", "1.5");
    expect(output.toString()).toBe("144.593");
});
test('Should work for DOGE-SALE', () => {
    const output = (0, cryptoSaleManager_1.fetchSALE)("3.5", 8, 3, "0.00198422341298374987", "138.8911", "1.5");
    expect(output.toString()).toBe("0.000");
    const output2 = (0, cryptoSaleManager_1.fetchSALE)("350000", 8, 3, "0.00198422341298374987", "138.8911", "1.5");
    expect(output2.toString()).toBe("7.500");
});
test('Should work for ETH-SALE bigvalues input', () => {
    const output = (0, cryptoSaleManager_1.fetchSALE)("992465.123456789012345678", 18, 18, "138.8911", "138.8911", "6540825.876543210987654325");
    expect(output.toString()).toBe("6491541561072.818099748528072316");
});
test('Should work for BTC-SALE bigvalues input', () => {
    const output = (0, cryptoSaleManager_1.fetchSALE)("992465.123456789012345678", 8, 18, "3825.281112", "138.8911", "6540825.876543210987654325");
    expect(output.toString()).toBe("178787347219043.160674658985510029");
});
test('Should work for DOGE-SALE bigvalues input', () => {
    const output = (0, cryptoSaleManager_1.fetchSALE)("992465.123456789012345678", 8, 18, "0.001984223412983750", "138.8911", "6540825.876543210987654325");
    expect(output.toString()).toBe("92739338.602961358374866197");
});
