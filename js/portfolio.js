// ========================================
// CHECK LOGIN
// ========================================

const isLoggedIn =
    localStorage.getItem(
        "isLoggedIn"
    );

const loggedInEmail =
    localStorage.getItem(
        "loggedInEmail"
    );

if (
    isLoggedIn !== "true" ||
    !loggedInEmail
) {

    alert(
        "Please login first."
    );

    window.location.href =
        "login.html";

}


// ========================================
// USER INFORMATION
// ========================================

function loadUser() {

    const userName =
        localStorage.getItem(
            "userName"
        );

    const welcomeUser =
        document.getElementById(
            "welcomeUser"
        );

    if (welcomeUser) {

        welcomeUser.textContent =
            "Welcome, " +
            (
                userName ||
                loggedInEmail
            );

    }

}


// ========================================
// PORTFOLIO STORAGE KEY
// ========================================

const portfolioStorageKey =
    "portfolio_" +
    loggedInEmail;


// ========================================
// PORTFOLIO DATA
// ========================================

let portfolio = [];


// ========================================
// LOAD PORTFOLIO FROM LOCAL STORAGE
// ========================================

function loadPortfolio() {

    const savedPortfolio =
        localStorage.getItem(
            portfolioStorageKey
        );

    if (savedPortfolio) {

        try {

            portfolio =
                JSON.parse(
                    savedPortfolio
                );

        }
        catch (error) {

            console.error(
                "Portfolio data error:",
                error
            );

            portfolio = [];

        }

    }
    else {

        portfolio = [];

    }

    displayPortfolio();

}


// ========================================
// SAVE PORTFOLIO TO LOCAL STORAGE
// ========================================

function savePortfolio() {

    localStorage.setItem(
        portfolioStorageKey,
        JSON.stringify(
            portfolio
        )
    );

}


// ========================================
// ADD INVESTMENT
// ========================================

const portfolioForm =
    document.getElementById(
        "portfolioForm"
    );


if (portfolioForm) {

    portfolioForm.addEventListener(
        "submit",
        addInvestment
    );

}


function addInvestment(event) {

    event.preventDefault();


    const stock =
        document.getElementById(
            "portfolioStock"
        )
        .value
        .trim()
        .toUpperCase();


    const quantity =
        Number(
            document.getElementById(
                "portfolioQuantity"
            )
            .value
        );


    const buyPrice =
        Number(
            document.getElementById(
                "portfolioBuyPrice"
            )
            .value
        );


    const currentPrice =
        Number(
            document.getElementById(
                "portfolioCurrentPrice"
            )
            .value
        );


    if (
        !stock ||
        !Number.isFinite(quantity) ||
        quantity <= 0 ||
        !Number.isFinite(buyPrice) ||
        buyPrice < 0 ||
        !Number.isFinite(currentPrice) ||
        currentPrice < 0
    ) {

        alert(
            "Enter a stock name and valid prices and quantity."
        );

        return;

    }


    const investment = {

        id:
            Date.now(),

        stock:
            stock,

        quantity:
            quantity,

        buyPrice:
            buyPrice,

        currentPrice:
            currentPrice

    };


    portfolio.push(
        investment
    );


    savePortfolio();


    portfolioForm.reset();


    displayPortfolio();


    alert(
        "Investment added successfully."
    );

}


// ========================================
// DISPLAY PORTFOLIO
// ========================================

function displayPortfolio() {

    const container =
        document.getElementById(
            "portfolioContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    let totalInvestment = 0;

    let currentValue = 0;


    // ========================================
    // NO INVESTMENTS
    // ========================================

    if (
        portfolio.length === 0
    ) {

        container.innerHTML = `

            <div class="fund-card">

                <h3>
                    No Investments
                </h3>

                <p>
                    Add your first stock
                    investment above.
                </p>

            </div>

        `;

    }


    // ========================================
    // DISPLAY EACH INVESTMENT
    // ========================================

    portfolio.forEach(
        (
            investment,
            index
        ) => {

            const amount =
                Number(
                    investment.quantity
                ) *
                Number(
                    investment.buyPrice
                );


            const currentPrice =
                Number.isFinite(
                    Number(
                        investment.currentPrice
                    )
                )
                    ? Number(
                        investment.currentPrice
                    )
                    : Number(
                        investment.buyPrice
                    );


            const holdingValue =
                Number(
                    investment.quantity
                ) *
                currentPrice;


            totalInvestment +=
                amount;


            currentValue +=
                holdingValue;


            // ========================================
            // CREATE CARD
            // ========================================

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "portfolio-card";


            // ========================================
            // STOCK NAME
            // ========================================

            const heading =
                document.createElement(
                    "h3"
                );


            heading.textContent =
                investment.stock;


            card.appendChild(
                heading
            );


            // ========================================
            // DETAILS
            // ========================================

            addHoldingDetail(
                card,
                "Quantity",
                investment.quantity
            );


            addHoldingDetail(
                card,
                "Buy Price",
                `₹${Number(
                    investment.buyPrice
                ).toFixed(2)}`
            );


            addHoldingDetail(
                card,
                "Investment",
                `₹${amount.toFixed(2)}`
            );


            addHoldingDetail(
                card,
                "Current Value",
                `₹${holdingValue.toFixed(2)}`
            );


            // ========================================
            // UPDATE PRICE FORM
            // ========================================

            const priceForm =
                document.createElement(
                    "form"
                );


            priceForm.className =
                "holding-price-form";


            const priceLabel =
                document.createElement(
                    "label"
                );


            priceLabel.htmlFor =
                `currentPrice-${index}`;


            priceLabel.textContent =
                "Current price per share";


            const priceInput =
                document.createElement(
                    "input"
                );


            priceInput.id =
                `currentPrice-${index}`;


            priceInput.type =
                "number";


            priceInput.min =
                "0";


            priceInput.step =
                "0.01";


            priceInput.value =
                currentPrice.toFixed(2);


            priceInput.required =
                true;


            const updatePriceButton =
                document.createElement(
                    "button"
                );


            updatePriceButton.type =
                "submit";


            updatePriceButton.textContent =
                "Update Price";


            priceForm.append(
                priceLabel,
                priceInput,
                updatePriceButton
            );


            priceForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    updatePrice(
                        investment.id,
                        Number(
                            priceInput.value
                        )
                    );

                }
            );


            card.appendChild(
                priceForm
            );


            // ========================================
            // DELETE BUTTON
            // ========================================

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";


            deleteButton.className =
                "delete-btn";


            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteInvestment(
                        investment.id
                    );

                }
            );


            card.appendChild(
                deleteButton
            );


            // ========================================
            // ADD CARD TO CONTAINER
            // ========================================

            container.appendChild(
                card
            );

        }
    );


    // ========================================
    // TOTAL INVESTMENT
    // ========================================

    const totalInvestmentElement =
        document.getElementById(
            "totalInvestment"
        );


    if (totalInvestmentElement) {

        totalInvestmentElement.textContent =
            "₹" +
            totalInvestment.toFixed(2);

    }


    // ========================================
    // CURRENT VALUE
    // ========================================

    const currentValueElement =
        document.getElementById(
            "currentValue"
        );


    if (currentValueElement) {

        currentValueElement.textContent =
            "₹" +
            currentValue.toFixed(2);

    }


    // ========================================
    // PROFIT / LOSS
    // ========================================

    const profitLoss =
        currentValue -
        totalInvestment;


    const profitLossElement =
        document.getElementById(
            "profitLoss"
        );


    if (profitLossElement) {

        profitLossElement.textContent =
            `${profitLoss < 0 ? "-" : ""}₹${Math.abs(
                profitLoss
            ).toFixed(2)}`;


        profitLossElement.classList.toggle(
            "positive",
            profitLoss >= 0
        );


        profitLossElement.classList.toggle(
            "negative",
            profitLoss < 0
        );

    }

}


// ========================================
// ADD HOLDING DETAIL
// ========================================

function addHoldingDetail(
    card,
    label,
    value
) {

    const detail =
        document.createElement(
            "p"
        );


    const detailLabel =
        document.createElement(
            "strong"
        );


    detailLabel.textContent =
        `${label}: `;


    detail.append(
        detailLabel,
        document.createTextNode(
            value
        )
    );


    card.appendChild(
        detail
    );

}


// ========================================
// UPDATE CURRENT PRICE
// ========================================

function updatePrice(
    id,
    currentPrice
) {

    if (
        !Number.isFinite(
            currentPrice
        ) ||
        currentPrice < 0
    ) {

        alert(
            "Enter a valid current price."
        );

        return;

    }


    const index =
        portfolio.findIndex(
            investment =>
                investment.id === id
        );


    if (index === -1) {

        alert(
            "Investment not found."
        );

        return;

    }


    portfolio[index].currentPrice =
        currentPrice;


    savePortfolio();


    displayPortfolio();


    alert(
        "Price updated successfully."
    );

}


// ========================================
// DELETE INVESTMENT
// ========================================

function deleteInvestment(
    id
) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this investment?"
        );


    if (!confirmDelete) {

        return;

    }


    portfolio =
        portfolio.filter(
            investment =>
                investment.id !== id
        );


    savePortfolio();


    displayPortfolio();


    alert(
        "Investment deleted successfully."
    );

}


// ========================================
// LOGOUT
// ========================================

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        logoutUser
    );

}


function logoutUser(event) {

    event.preventDefault();


    localStorage.removeItem(
        "isLoggedIn"
    );


    localStorage.removeItem(
        "loggedInEmail"
    );


    window.location.href =
        "login.html";

}


// ========================================
// INITIAL LOAD
// ========================================

loadUser();

loadPortfolio();