document.addEventListener('DOMContentLoaded', function() {
    var banner = document.getElementById('discount-banner');

    // Function to fetch discount data based on IP
    function fetchDiscount() {
        fetch('http://localhost:3000/get-discount') // Update with your server's address
            .then(response => response.json())
            .then(data => {
                banner.innerHTML = `Special Offer for You: ${data.discount}`;
                banner.style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching discount:', error);
                banner.style.display = 'none'; // Hide banner if there's an error
            });
    }

    fetchDiscount();
});
