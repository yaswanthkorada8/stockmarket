/* ==================================================
   INVEST INDIA - DEMO STOCK DATA
================================================== */

const demoStocks = {

    ITC: {
        symbol: "ITC",
        companyName: "ITC Limited",
        price: "430.00",
        open: "425.50",
        high: "434.80",
        low: "423.20",
        previousClose: "427.10",
        volume: "12500000"
    },

    TCS: {
        symbol: "TCS",
        companyName: "Tata Consultancy Services",
        price: "3900.00",
        open: "3875.00",
        high: "3925.00",
        low: "3860.00",
        previousClose: "3888.50",
        volume: "2500000"
    },

    INFY: {
        symbol: "INFY",
        companyName: "Infosys Limited",
        price: "1500.00",
        open: "1488.00",
        high: "1515.00",
        low: "1480.00",
        previousClose: "1492.00",
        volume: "4200000"
    },

    RELIANCE: {
        symbol: "RELIANCE",
        companyName: "Reliance Industries",
        price: "2900.00",
        open: "2875.00",
        high: "2920.00",
        low: "2860.00",
        previousClose: "2885.00",
        volume: "3800000"
    },

    HDFCBANK: {
        symbol: "HDFCBANK",
        companyName: "HDFC Bank",
        price: "1700.00",
        open: "1688.00",
        high: "1718.00",
        low: "1675.00",
        previousClose: "1692.00",
        volume: "5100000"
    },

    SBIN: {
        symbol: "SBIN",
        companyName: "State Bank of India",
        price: "850.00",
        open: "842.00",
        high: "858.00",
        low: "838.00",
        previousClose: "845.00",
        volume: "6800000"
    },

    ICICIBANK: {
        symbol: "ICICIBANK",
        companyName: "ICICI Bank",
        price: "1400.00",
        open: "1392.00",
        high: "1415.00",
        low: "1385.00",
        previousClose: "1396.00",
        volume: "4500000"
    },

    WIPRO: {
        symbol: "WIPRO",
        companyName: "Wipro Limited",
        price: "550.00",
        open: "545.00",
        high: "558.00",
        low: "540.00",
        previousClose: "548.00",
        volume: "3200000"
    },

    HCLTECH: {
        symbol: "HCLTECH",
        companyName: "HCL Technologies",
        price: "1600.00",
        open: "1585.00",
        high: "1615.00",
        low: "1570.00",
        previousClose: "1590.00",
        volume: "2100000"
    },

    MARUTI: {
        symbol: "MARUTI",
        companyName: "Maruti Suzuki India",
        price: "13000.00",
        open: "12900.00",
        high: "13150.00",
        low: "12820.00",
        previousClose: "12950.00",
        volume: "850000"
    }
};


/* ==================================================
   FIND STOCK
================================================== */

function findDemoStock(searchValue) {

    const value = searchValue
        .trim()
        .toUpperCase();

    if (!value) {
        return null;
    }

    if (demoStocks[value]) {
        return demoStocks[value];
    }

    return Object.values(demoStocks).find(stock =>
        stock.companyName
            .toUpperCase()
            .includes(value)
    ) || null;
}


/* ==================================================
   GET STOCK DATA
================================================== */

async function getStockData(searchValue) {

    await new Promise(resolve => {
        setTimeout(resolve, 300);
    });

    const stock = findDemoStock(searchValue);

    console.log("Stock Data:", stock);

    return stock;
}