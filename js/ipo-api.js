// ========================================
// IPO DATA
// ========================================

const ipoData = [

    {
        company:
            "NSE",

        price:
            "₹1700 - ₹1785",

        lotSize:
            "8",

        issueSize:
            "₹22000 Crore",

        openDate:
            "Coming Soon",

        closeDate:
            "Coming Soon",

        listingDate:
            "Coming Soon",

        gmp:
            "N/A",

        status:
            "upcoming"
    },


    {
        company:
            "Example Company B",

        price:
            "₹120 - ₹125",

        lotSize:
            "120",

        issueSize:
            "₹750 Crore",

        openDate:
            "Coming Soon",

        closeDate:
            "Coming Soon",

        listingDate:
            "Coming Soon",

        gmp:
            "N/A",

        status:
            "upcoming"
    }

];


// ========================================
// DISPLAY IPOs
// ========================================

function displayIPOs(
    selectedStatus = "upcoming"
) {

    const container =
        document.getElementById(
            "ipoContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const filteredIPOs =
        ipoData.filter(
            ipo =>
                ipo.status ===
                selectedStatus
        );


    if (filteredIPOs.length === 0) {

        container.innerHTML = `

            <div class="loading-card">

                <p>
                    No ${selectedStatus} IPOs available.
                </p>

            </div>

        `;

        return;
    }


    filteredIPOs.forEach(
        ipo => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "ipo-card";


            card.innerHTML = `

                <h3>
                    ${ipo.company}
                </h3>

                <p>
                    <strong>Price:</strong>
                    ${ipo.price}
                </p>

                <p>
                    <strong>Lot Size:</strong>
                    ${ipo.lotSize}
                </p>

                <p>
                    <strong>Issue Size:</strong>
                    ${ipo.issueSize}
                </p>

                <p>
                    <strong>Open:</strong>
                    ${ipo.openDate}
                </p>

                <p>
                    <strong>Close:</strong>
                    ${ipo.closeDate}
                </p>

                <p>
                    <strong>Listing:</strong>
                    ${ipo.listingDate}
                </p>

                <p>
                    <strong>GMP:</strong>
                    ${ipo.gmp}
                </p>

            `;


            container.appendChild(
                card
            );

        }
    );

}