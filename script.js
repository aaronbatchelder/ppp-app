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
