/* ==================================================
   STOCK TECHNICAL ANALYSIS
   Frontend Demo Version
================================================== */


/* ==================================================
   SMA - SIMPLE MOVING AVERAGE
================================================== */

function calculateSMA(prices, period) {

    if (
        !Array.isArray(prices) ||
        prices.length < period ||
        period <= 0
    ) {
        return null;
    }

    const recentPrices =
        prices.slice(-period);

    const total =
        recentPrices.reduce(
            (sum, price) =>
                sum + Number(price),
            0
        );

    return total / period;
}


/* ==================================================
   RSI - RELATIVE STRENGTH INDEX
================================================== */

function calculateRSI(
    prices,
    period = 14
) {

    if (
        !Array.isArray(prices) ||
        prices.length <= period ||
        period <= 0
    ) {
        return null;
    }

    let gains = 0;
    let losses = 0;

    for (
        let i = 1;
        i <= period;
        i++
    ) {

        const difference =
            Number(prices[i]) -
            Number(prices[i - 1]);

        if (difference > 0) {

            gains += difference;

        } else {

            losses +=
                Math.abs(difference);

        }
    }

    const averageGain =
        gains / period;

    const averageLoss =
        losses / period;

    if (averageLoss === 0) {
        return 100;
    }

    const rs =
        averageGain /
        averageLoss;

    return (
        100 -
        (100 / (1 + rs))
    );
}


/* ==================================================
   TREND
================================================== */

function determineTrend(
    currentPrice,
    sma20,
    sma50
) {

    if (
        currentPrice === null ||
        sma20 === null ||
        sma50 === null
    ) {
        return "Insufficient Data";
    }

    if (
        currentPrice > sma20 &&
        sma20 > sma50
    ) {

        return "Uptrend";

    }

    if (
        currentPrice < sma20 &&
        sma20 < sma50
    ) {

        return "Downtrend";

    }

    return "Sideways";
}


/* ==================================================
   RSI STATUS
================================================== */

function determineRSIStatus(rsi) {

    if (rsi === null) {
        return "Insufficient Data";
    }

    if (rsi >= 70) {
        return "Overbought";
    }

    if (rsi <= 30) {
        return "Oversold";
    }

    return "Neutral";
}


/* ==================================================
   ANALYSIS SUMMARY
================================================== */

function generateAnalysisSummary(
    currentPrice,
    sma20,
    sma50,
    rsi
) {

    const trend =
        determineTrend(
            currentPrice,
            sma20,
            sma50
        );

    const rsiStatus =
        determineRSIStatus(rsi);

    return {
        trend: trend,
        rsiStatus: rsiStatus,
        currentPrice: currentPrice,
        sma20: sma20,
        sma50: sma50,
        rsi: rsi
    };
}


/* ==================================================
   FORMAT NUMBER
================================================== */

function formatAnalysisNumber(
    value,
    decimals = 2
) {

    if (
        value === null ||
        value === undefined ||
        Number.isNaN(Number(value))
    ) {
        return "—";
    }

    return Number(value).toFixed(decimals);
}