# Exercise-SALE
Solution for exersice https://gist.github.com/DheerajD/c41c374961972f063e56af62260d0ff9

## Instructions to run the code
1. Fetch a local copy of the repo.
2. Install dependencies - `npm i` - Creates node_modules and adds all the required packages
3. Run code: `npm run start`

Output:
```
ddoodhya@88665a13fff2 Exercise-SALE % npm run start

> Exercise-SALE@1.0.0 start /Users/ddoodhya/Desktop/ddexersice/JS-Exercise-SALE
> tsc && node ./dist/src/index.js < input.txt

5.250
144.593
0.000
7.500
5.2
6491541561072.818099748528072316
92739338.602961358374866197
178787347219043.160674658985510029
```
4. To run tests: `npm test` 

Output:
```
ddoodhya@88665a13fff2 Exercise-SALE % npm test     

> JS-Exercise-SALE@1.0.0 test /Users/ddoodhya/Desktop/ddexersice/Exercise-SALE
> jest ./test/**.ts

 PASS  test/cryptoSaleManager.test.ts
  ✓ Should work for ETH-SALE (6 ms)
  ✓ Should work for BTC-SALE (1 ms)
  ✓ Should work for DOGE-SALE
  ✓ Should work for ETH-SALE bigvalues input
  ✓ Should work for BTC-SALE bigvalues input (1 ms)
  ✓ Should work for DOGE-SALE bigvalues input

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.003 s
Ran all test suites matching /.\/test\/cryptoSaleManager.test.ts/i.
```
* Note: Use command npm run start_current to use input_current.txt file and calculate SALE using current cryptocurrency prices.

## Explanation
1. `index.ts` file - Contains the functional driver code. Reads the input file, process the input(`processInput()` function) and calls `fetchSALE()` to get quantity of SALE tokens. Further it defines the `enum Currency` used to handle crypto values through the application
2. `cryptoSaleManager.ts` - Contains the logic to calculate the amount of SALE tokens. Uses **BigNumber.js** to handle big values. Calculation is done under the function `fetchSALE()` in 4 steps(described in comments as well):
* Step1: Calculate value of 1 Source-Curreny-Wei to Eth-Wei ratio(ex. If we're purchasing with BTC, here were finding relation between Satoshi and Wei).
* Step2: Calculate totalEthWei in given amount;
* Step3: Calculate 1 Eth-wei to SALE(Destination-Currency)-wei ratio.
* Step4: Find total number of SALE-wei and calculate SALE token quantity from it.

fetchSALE() accepts arguments:
* amount: Amount of purchase
* srcDecimal: Decimals in Currency of purchase
* desDecimal: SALE Decimal places
* srcPrice: USD price of Currency of purchase
* ethPrice: USD price of Ethereum
* ETHSALErate: ETH to SALE purchase Ratio

And returns the (bignumber/)value of SALE token quantity.

`fetchSALE()` is using `getDecimalParser()` function to get CUR-Wei conversion factor and `roundDown()` to round down(and pad) the values

3. `priceFetcher.ts` - Class defined which encapsulates private API-Key and the functionality to fetch current cryptocurrency prices using crypto-compare API.
4. `cryptoSaleManager.test.ts` - Unit tests for `cryptoSaleManager.ts`
5. `package.json` - Contains devDependencies and script commands to compile and run the project and to run the unit tests.
