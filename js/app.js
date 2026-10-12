
/* ==================================================
   INVEST INDIA - FRONTEND APP
================================================== */


/* ==================================================
   STOCK SEARCH
================================================== */

function setupStockSearch() {

    const searchButton =
        document.getElementById("searchStock");

    const stockInput =
        document.getElementById("stockSymbol");

    if (!searchButton || !stockInput) {
        return;
    }

    searchButton.addEventListener("click", searchStock);

    stockInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchStock();
        }
    });

    // Auto search from suggestion
    stockInput.addEventListener("change", function () {
        if (stockInput.value.trim()) {
            searchStock();
        }
    });
}


/* ==================================================
   SEARCH STOCK
================================================== */

async function searchStock() {

    const input =
        document.getElementById("stockSymbol");

    if (!input) {
        return;
    }

    const searchValue = input.value.trim();

    if (!searchValue) {
        alert("Please enter a stock symbol.");
        return;
    }

    const searchButton =
        document.getElementById("searchStock");

    if (searchButton) {
        searchButton.disabled = true;
        searchButton.textContent = "Searching...";
    }

    try {

        const stock =
            await getStockData(searchValue);

        if (!stock) {
            alert(
                "Stock not found.\n\n" +
                "Try: ITC, TCS, INFY, RELIANCE, " +
                "HDFCBANK, SBIN, ICICIBANK, WIPRO, " +
                "HCLTECH or MARUTI."
            );
            return;
        }

        displayStockData(stock);

    } catch (error) {

        console.error("Stock Search Error:", error);

        alert("Unable to fetch stock data.");

    } finally {

        if (searchButton) {
            searchButton.disabled = false;
            searchButton.textContent = "🔍 Search Stock";
        }
    }
}


/* ==================================================
   DISPLAY STOCK DATA
================================================== */

function displayStockData(stock) {

    if (!stock) {
        return;
    }

    const stockName =
        document.getElementById("stockName");

    const stockCode =
        document.getElementById("stockCode");

    const currentPrice =
        document.getElementById("currentPrice");

    const openPrice =
        document.getElementById("openPrice");

    const highPrice =
        document.getElementById("highPrice");

    const lowPrice =
        document.getElementById("lowPrice");

    const previousClose =
        document.getElementById("previousClose");

    const volume =
        document.getElementById("volume");

    if (stockName) {
        stockName.textContent = stock.companyName || "—";
    }

    if (stockCode) {
        stockCode.textContent = stock.symbol || "—";
    }

    if (currentPrice) {
        currentPrice.textContent =
            stock.price ? "₹" + stock.price : "—";
    }

    if (openPrice) {
        openPrice.textContent =
            stock.open ? "₹" + stock.open : "—";
    }

    if (highPrice) {
        highPrice.textContent =
            stock.high ? "₹" + stock.high : "—";
    }

    if (lowPrice) {
        lowPrice.textContent =
            stock.low ? "₹" + stock.low : "—";
    }

    if (previousClose) {
        previousClose.textContent =
            stock.previousClose
                ? "₹" + stock.previousClose
                : "—";
    }

    if (volume) {
        volume.textContent = stock.volume || "—";
    }

    updateWatchlistButton(stock.symbol);

    console.log("Displayed stock:", stock);
}


/* ==================================================
   WATCHLIST
================================================== */

function setupWatchlist() {

    const button =
        document.getElementById("watchlistBtn");

    if (!button) {
        return;
    }

    button.addEventListener("click", function () {

        const stockCode =
            document.getElementById("stockCode");

        if (!stockCode) {
            return;
        }

        const symbol = stockCode.textContent.trim();

        if (!symbol || symbol === "—") {
            alert("Please search for a stock first.");
            return;
        }

        const watchlist = getWatchlist();

        const existingIndex = watchlist.indexOf(symbol);

        // Remove from watchlist
        if (existingIndex !== -1) {

            watchlist.splice(existingIndex, 1);
            saveWatchlist(watchlist);
            updateWatchlistButton(symbol);

            alert(symbol + " removed from your watchlist.");
            return;
        }

        // Add to watchlist
        watchlist.push(symbol);
        saveWatchlist(watchlist);
        updateWatchlistButton(symbol);

        alert(symbol + " added to your watchlist.");
    });
}


/* ==================================================
   GET WATCHLIST
================================================== */

function getWatchlist() {

    const savedWatchlist =
        localStorage.getItem("investIndiaWatchlist");

    if (!savedWatchlist) {
        return [];
    }

    try {

        const watchlist = JSON.parse(savedWatchlist);

        return Array.isArray(watchlist) ? watchlist : [];

    } catch (error) {

        console.error("Watchlist Error:", error);
        return [];

    }
}


/* ==================================================
   SAVE WATCHLIST
================================================== */

function saveWatchlist(watchlist) {

    localStorage.setItem(
        "investIndiaWatchlist",
        JSON.stringify(watchlist)
    );
}


/* ==================================================
   UPDATE WATCHLIST BUTTON
================================================== */

function updateWatchlistButton(symbol) {

    const button =
        document.getElementById("watchlistBtn");

    if (!button) {
        return;
    }

    const watchlist = getWatchlist();
    const isAdded = watchlist.includes(symbol);

    if (isAdded) {

        button.textContent = "⭐ Remove from Watchlist";
        button.classList.add("watchlist-added");

    } else {

        button.textContent = "⭐ Add to Watchlist";
        button.classList.remove("watchlist-added");

    }
}


/* ==================================================
   IPO FILTERS
================================================== */

function setupIPOFilters() {

    const openButton =
        document.getElementById("openIPOS");

    const closedButton =
        document.getElementById("closedIPOS");

    const upcomingButton =
        document.getElementById("upcomingIPOS");

    if (!openButton || !closedButton || !upcomingButton) {
        return;
    }

    openButton.addEventListener("click", function () {
        setActiveIPOButton(openButton);
        displayIPOs("open");
    });

    closedButton.addEventListener("click", function () {
        setActiveIPOButton(closedButton);
        displayIPOs("closed");
    });

    upcomingButton.addEventListener("click", function () {
        setActiveIPOButton(upcomingButton);
        displayIPOs("upcoming");
    });

    displayIPOs("upcoming");
}


/* ==================================================
   ACTIVE IPO BUTTON
================================================== */

function setActiveIPOButton(activeButton) {

    const buttons =
        document.querySelectorAll(".ipo-filters button");

    buttons.forEach(function (button) {
        button.classList.remove("active");
    });

    activeButton.classList.add("active");
}


/* ==================================================
   MUTUAL FUND SEARCH
================================================== */

function setupMutualFundSearch() {

    const button =
        document.getElementById("searchMutualFund");

    const input =
        document.getElementById("mutualFundSearch");

    if (!button || !input) {
        return;
    }

    button.addEventListener("click", async function () {

        const value = input.value.trim();

        if (!value) {
            alert("Please enter a mutual fund name.");
            return;
        }

        const result = await searchMutualFund(value);

        const container =
            document.getElementById("fundContainer");

        if (!container) {
            return;
        }

        if (result) {

            const card = document.createElement("div");
            card.className = "fund-card";

            const heading = document.createElement("h3");
            heading.textContent = result.fundName;

            const description = document.createElement("p");
            description.textContent = "Mutual fund search result.";

            card.append(heading, description);
            container.replaceChildren(card);

        } else {

            container.textContent = "Unable to search mutual fund.";

        }
    });
}


/* ==================================================
   ETF SEARCH
================================================== */

function setupETFSearch() {

    const button =
        document.getElementById("searchETF");

    const input =
        document.getElementById("etfSearch");

    if (!button || !input) {
        return;
    }

    button.addEventListener("click", async function () {

        const value = input.value.trim();

        if (!value) {
            alert("Please enter an ETF symbol.");
            return;
        }

        const result = await searchETF(value);

        const container =
            document.getElementById("etfContainer");

        if (!container) {
            return;
        }

        if (result) {

            const card = document.createElement("div");
            card.className = "etf-card";

            const heading = document.createElement("h3");
            heading.textContent = result.symbol;

            const description = document.createElement("p");
            description.textContent = "ETF search result.";

            card.append(heading, description);
            container.replaceChildren(card);

        } else {

            container.textContent = "Unable to search ETF.";

        }
    });
}


/* ==================================================
   PROFILE USERNAME
================================================== */

function loadProfileName() {

    const profileName =
        document.getElementById("profileUserName");

    if (!profileName) {
        return;
    }

    const userName = localStorage.getItem("userName");

    profileName.textContent = userName || "User";
}


/* ==================================================
   PROFILE DROPDOWN
================================================== */

function setupProfileDropdown() {

    const profileMenu =
        document.querySelector(".profile-menu");

    if (!profileMenu) {
        return;
    }

    const profileImage =
        profileMenu.querySelector(".profile-image");

    const dropdown =
        profileMenu.querySelector(".profile-dropdown");

    if (!profileImage || !dropdown) {
        console.warn("Profile dropdown elements were not found.");
        return;
    }

    // Allow keyboard access if the profile image is not a button.
    if (profileImage.tagName.toLowerCase() !== "button") {
        profileImage.setAttribute("role", "button");
        profileImage.setAttribute("tabindex", "0");
        profileImage.setAttribute("aria-label", "Open profile menu");
    }

    profileImage.setAttribute("aria-haspopup", "true");
    profileImage.setAttribute("aria-expanded", "false");

    function closeDropdown() {
        profileMenu.classList.remove("active");
        profileImage.setAttribute("aria-expanded", "false");
    }

    function toggleDropdown(event) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const isOpen = profileMenu.classList.toggle("active");

        profileImage.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    }

    profileImage.addEventListener("click", toggleDropdown);

    profileImage.addEventListener("keydown", function (event) {

        if (event.key === "Enter" || event.key === " ") {
            toggleDropdown(event);
        }

        if (event.key === "Escape") {
            closeDropdown();
        }
    });

    document.addEventListener("click", function (event) {

        if (!profileMenu.contains(event.target)) {
            closeDropdown();
        }
    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeDropdown();
        }
    });
}


/* ==================================================
   LOGIN / REGISTER NAVIGATION
================================================== */

function updateAuthNavigation() {

    const loginNav =
        document.getElementById("loginNav");

    const registerNav =
        document.getElementById("registerNav");

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {

        if (loginNav) {
            loginNav.style.display = "none";
        }

        if (registerNav) {
            registerNav.style.display = "none";
        }
    }
}


/* ==================================================
   SECURITY & SETTINGS
================================================== */

function setupSecurityButton() {

    const button =
        document.getElementById("securityBtn");

    if (!button) {
        return;
    }

    button.addEventListener("click", function (event) {

        event.preventDefault();

        alert(
            "Security & Settings\n\n" +
            "Your account currently uses local browser storage."
        );
    });
}


/* ==================================================
   THEME TOGGLE
================================================== */

function setupThemeToggle() {

    const button =
        document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    loadSavedTheme();

    button.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        const darkMode =
            document.body.classList.contains("dark-theme");

        localStorage.setItem(
            "darkMode",
            darkMode ? "true" : "false"
        );

        button.textContent =
            darkMode ? "☀️ Light Theme" : "🌙 Switch Theme";
    });
}



/* ==================================================
   THEME TOGGLE
================================================== */

function setupThemeToggle() {

    const button = document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    loadSavedTheme();

    button.addEventListener("click", function () {

        const darkMode =
            !document.body.classList.contains("dark-theme");

        document.body.classList.toggle("dark-theme", darkMode);

        localStorage.setItem("darkMode", String(darkMode));

        button.textContent = darkMode
            ? "☀️ Light Theme"
            : "🌙 Switch Theme";

    });

}


/* ==================================================
   LOAD SAVED THEME
================================================== */

function loadSavedTheme() {

    const button = document.getElementById("themeToggle");

    const darkMode =
        localStorage.getItem("darkMode") === "true";

    document.body.classList.toggle("dark-theme", darkMode);

    if (button) {
        button.textContent = darkMode
            ? "☀️ Light Theme"
            : "🌙 Switch Theme";
    }

}

/* ==================================================
   LOGOUT
================================================== */

function setupLogout() {

    const logoutButton =
        document.getElementById("logoutBtn");

    if (!logoutButton) {
        return;
    }

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInEmail");

        alert("You have been logged out.");

        window.location.href = "index.html";
    });
}


/* ==================================================
   INITIALIZE APP
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Invest India frontend loaded successfully.");

    setupStockSearch();
    setupWatchlist();
    setupIPOFilters();
    setupMutualFundSearch();
    setupETFSearch();

    loadProfileName();
    updateAuthNavigation();

    setupSecurityButton();
    setupThemeToggle();
    setupLogout();

    // Important: initialize the profile dropdown
    setupProfileDropdown();

});
