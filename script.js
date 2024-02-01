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

                banner.innerHTML = `Hello! 👋 You are in ${geoResponse.country} ${countryFlag}. It looks like your region is supported by Parity Purchasing Power. Use code 'PPP&ME' to get ${data.discount} off!`;
                banner.style.display = 'block';
                console.log(countryCode);
                console.log(geoResponse);
                console.log(countryFlag)
            })
            .catch(error => {
                console.error('Error fetching discount:', error);
                banner.style.display = 'none'; // Hide banner if there's an error
            });
    }

    fetchDiscount();
});

/*
document.addEventListener('DOMContentLoaded', function() {
    var banner = document.getElementById('discount-banner');

    // Function to fetch discount data based on IP
    function fetchDiscount() {
        fetch('https://ppp-server-9ec0fd68f4a5.herokuapp.com/get-discount') // Update with your server's address
            .then(response => response.json())
            .then(data => {
                banner.innerHTML = `Hello! 👋 It looks like your region is supported by Parity Purchasing Power. Use code 'PPP&ME' to get ${data.discount} off!`;
                banner.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching discount:', error);
                banner.style.display = 'none'; // Hide banner if there's an error
            });
    }

    fetchDiscount();
});
*/
