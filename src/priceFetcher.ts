import axios from "axios";
import { Currency } from ".";

//Defining this class to encapsulate API calls to fetch current prices and private API key
class PriceFetcher {
  private apiKey = "6aae6af9b99307bc18680e6029d62b6fe56daf919c8e18c521294661732e2c12";
  //Dheeraj's READ-ONLY private key. PLEASE DO NOT RE-USE IN OTHER APPLICATIONS.

  getPrices = async (symbols: Currency[]): Promise<Map<Currency, number>> => {
    return this.prepareResponse(this.getCurrentPriceURL(symbols));
  };

  private getCurrentPriceURL = (symbols: Currency[]) => {
    return `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols.join(",")}&tsyms=USD`;
  };
  
  private prepareResponse = async (url: string): Promise<Map<Currency, number>> => {
    const response = await axios.get(url, {
      headers: {
        authorization: `Apikey ${this.apiKey}`,
      },
    });

    const responseKeys = Object.keys(response.data);

    const prices = responseKeys.reduce((acc, key) => {
      if (response.data[key] && response.data[key]["USD"]) {
        acc.set(key as unknown as Currency, response.data[key]["USD"]);
      }
      return acc;
    }, new Map());
    return prices;
  };
}

export default new PriceFetcher();