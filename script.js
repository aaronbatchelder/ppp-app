document.addEventListener('DOMContentLoaded', function() {
    var banner = document.getElementById('discount-banner');

    // Function to fetch discount data based on IP
    function fetchDiscount() {
        fetch('https://ppp-server-9ec0fd68f4a5.herokuapp.com/get-discount') // Update with your server's address
            .then(response => response.json())
            .then(data => {
                // Function to convert country code to emoji flag
                function countryCodeToFlag(countryCode) {
                    const codePoints = countryCode
                        .toUpperCase()
                        .split('')
                        .map(char => 127397 + char.charCodeAt(0));
                    return String.fromCodePoint(...codePoints);
                }

                // Assuming you have the `geoResponse` object available in data
                const geoResponse = data.geoResponse;

                // Extract the country code from geoResponse
                const countryCode = geoResponse.countryCode;

                // Get the emoji flag for the country code
                const countryFlag = countryCodeToFlag(countryCode);

                // Update this selector to target the navigation bar element on different websites
                const navigationBar = document.querySelector('.navbar');

                // Check if the navigation bar exists on the current website
                if (navigationBar) {
                    // Position the banner relative to the navigation bar
                    navigationBar.appendChild(banner);
                    banner.innerHTML = `Hello! 👋 Great news! We support purchasing power parity in your country. ${geoResponse.country} ${countryFlag} customers are getting a ${data.discount} discount. Use code 'PPP&ME' at checkout.`;
                    banner.style.display = 'block';
                } else {
                    // If the navigation bar doesn't exist, simply display the banner
                    banner.innerHTML = `Hello! 👋 Great news! We support purchasing power parity in your country. ${geoResponse.country} ${countryFlag} customers are getting a ${data.discount} discount. Use code 'PPP&ME' at checkout.`;
                    banner.style.display = 'block';
                }

                console.log(countryCode);
                console.log(geoResponse);
                console.log(countryFlag);
            })
            .catch(error => {
                console.error('Error fetching discount:', error);
                banner.style.display = 'none'; // Hide banner if there's an error
            });
    }

    fetchDiscount();
});
