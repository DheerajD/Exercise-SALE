import * as readline from 'readline';
import { fetchSALE } from './cryptoSaleManager';
import priceFetcher from './priceFetcher';

//Driver code
async function main(): Promise<void> {

    const rl = readline.createInterface({
        input: process.stdin,
    });

    const inputs: string[] = [];
    rl.on('line', (line) => {
        inputs.push(line);
    });

    rl.on('close',async  () => {
        const processedInput = await processInput(inputs);

        for (const record of processedInput.conversionRequests) {
            const buyAmount = fetchSALE(
                record.purchaseAmount,
                currencyDecimals[record.purchaseCurrency],
                record.saleDecimal,
                processedInput.currencyPrices.get(record.purchaseCurrency)!,
                processedInput.currencyPrices.get(Currency.ETH)!,
                record.ethToSaleConversionRate
            );
            console.log(buyAmount);
        }
    });
}

//Using these values as args when calling fetchSALE
interface ConversionRequest {
    ethToSaleConversionRate: string;
    saleDecimal: number;
    purchaseCurrency: Currency;
    purchaseAmount: string;
}

export enum Currency {
    BTC = 'BTC',
    ETH = 'ETH',
    DOGE = 'DOGE'
}

//Assuming ETH to have 18 decimal places, BTC and DOGE to have 8 decimal places
const currencyDecimals = {
    [Currency.BTC]: 8,
    [Currency.ETH]: 18,
    [Currency.DOGE]: 8
};

//Reads the input file and fetches SALE quantity as per the input
async function processInput(inputs: string[]): Promise<{
    currencyPrices: Map<Currency, string>
    conversionRequests: ConversionRequest[];
}> {

    const currencyPrices = new Map();
    const conversionRequests: ConversionRequest[] = [];

    //Fetch current API from priceFetcher if first line in input.txt file is "CURRENT"
    if(inputs[0].trim().toLowerCase() === 'current') {
        const currentPrices = await priceFetcher.getPrices([Currency.BTC, Currency.ETH, Currency.DOGE]);
        currencyPrices.set(Currency.BTC, currentPrices.get(Currency.BTC)?.toString());
        currencyPrices.set(Currency.ETH, currentPrices.get(Currency.ETH)?.toString());
        currencyPrices.set(Currency.DOGE, currentPrices.get(Currency.DOGE)?.toString());
    } 
    else {    //Else use given values
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
            purchaseCurrency: splittedInput[2] as Currency,
            purchaseAmount: splittedInput[3]
        });
    }

    return {
        currencyPrices,
        conversionRequests
    };

}

main();

