// ========================================
// ETF SEARCH
// ========================================

async function searchETF(
    etfSymbol
) {

    try {

        if (!etfSymbol) {

            throw new Error(
                "ETF symbol is required"
            );
        }


        console.log(
            "Searching ETF:",
            etfSymbol
        );


        /*
            Live ETF API
            can be connected later.
        */


        return {
            success: true,
            symbol: etfSymbol
        };

    }

    catch (error) {

        console.error(
            "ETF Search Error:",
            error
        );

        return null;
    }
}