const express = require('express');
const cors = require('cors');
const request = require('request-promise');
const app = express();

app.use(cors());
// app.use(express.static('public'));

app.get('/get-discount', async (req, res) => {
    try {
        
       // const testIp = '71.181.68.248'; // Replace with an IP for testing

        // Get client's IP address from the request
       let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // If running locally, use a public IP for testing
        if (ip.includes("::1") || ip.includes("127.0.0.1")) {
            ip = "YOUR_PUBLIC_IP_FOR_TESTING"; // Replace with a real public IP
        }

        // Fetch country information using IP Geolocation API
        const geoResponse = await request({
            uri: `http://ip-api.com/json/${ip}`,
            // replace testIp with ip when switching back to live IP
            json: true
        });


    // Define discounts for countries
    const discounts = {
        'US': `10%`, // United States
        'CA': `${Math.floor(Math.random() * 26) + 5}%`, // Canada
        'MX': `${Math.floor(Math.random() * 26) + 5}%`, // Mexico
        'BZ': `${Math.floor(Math.random() * 26) + 5}%`, // Belize
        'CR': `${Math.floor(Math.random() * 26) + 5}%`, // Costa Rica
        'SV': `${Math.floor(Math.random() * 26) + 5}%`, // El Salvador
        'GT': `${Math.floor(Math.random() * 26) + 5}%`, // Guatemala
        'HN': `${Math.floor(Math.random() * 26) + 5}%`, // Honduras
        'NI': `${Math.floor(Math.random() * 26) + 5}%`, // Nicaragua
        'PA': `${Math.floor(Math.random() * 26) + 5}%`, // Panama
        'AR': `${Math.floor(Math.random() * 26) + 5}%`, // Argentina
        'BO': `${Math.floor(Math.random() * 26) + 5}%`, // Bolivia
        'BR': `50%`, // Brazil
        'CL': `${Math.floor(Math.random() * 26) + 5}%`, // Chile
        'CO': `${Math.floor(Math.random() * 26) + 5}%`, // Colombia
        'EC': `${Math.floor(Math.random() * 26) + 5}%`, // Ecuador
        'GY': `${Math.floor(Math.random() * 26) + 5}%`, // Guyana
        'PY': `${Math.floor(Math.random() * 26) + 5}%`, // Paraguay
        'PE': `${Math.floor(Math.random() * 26) + 5}%`, // Peru
        'SR': `${Math.floor(Math.random() * 26) + 5}%`, // Suriname
        'UY': `${Math.floor(Math.random() * 26) + 5}%`, // Uruguay
        'VE': `${Math.floor(Math.random() * 26) + 5}%`, // Venezuela
        'GB': `15%`, // United Kingdom
        'FR': `${Math.floor(Math.random() * 26) + 5}%`, // France
        'DE': `${Math.floor(Math.random() * 26) + 5}%`, // Germany
        'IT': `${Math.floor(Math.random() * 26) + 5}%`, // Italy
        'ES': `${Math.floor(Math.random() * 26) + 5}%`, // Spain
        'AU': `${Math.floor(Math.random() * 26) + 5}%`, // Australia
        'AT': `${Math.floor(Math.random() * 26) + 5}%`, // Austria
        'BE': `${Math.floor(Math.random() * 26) + 5}%`, // Belgium
        'BG': `${Math.floor(Math.random() * 26) + 5}%`, // Bulgaria
        'HR': `${Math.floor(Math.random() * 26) + 5}%`, // Croatia
        'CY': `${Math.floor(Math.random() * 26) + 5}%`, // Cyprus
        'CZ': `${Math.floor(Math.random() * 26) + 5}%`, // Czech Republic
        'DK': `${Math.floor(Math.random() * 26) + 5}%`, // Denmark
        'EE': `${Math.floor(Math.random() * 26) + 5}%`, // Estonia
        'FI': `${Math.floor(Math.random() * 26) + 5}%`, // Finland
        'GR': `${Math.floor(Math.random() * 26) + 5}%`, // Greece
        'HU': `${Math.floor(Math.random() * 26) + 5}%`, // Hungary
        'IE': `${Math.floor(Math.random() * 26) + 5}%`, // Ireland
        'LV': `${Math.floor(Math.random() * 26) + 5}%`, // Latvia
        'LT': `${Math.floor(Math.random() * 26) + 5}%`, // Lithuania
        'LU': `${Math.floor(Math.random() * 26) + 5}%`, // Luxembourg
        'MT': `${Math.floor(Math.random() * 26) + 5}%`, // Malta
        'NL': `${Math.floor(Math.random() * 26) + 5}%`, // Netherlands
        'NO': `${Math.floor(Math.random() * 26) + 5}%`, // Norway
        'PL': `${Math.floor(Math.random() * 26) + 5}%`, // Poland
        'PT': `${Math.floor(Math.random() * 26) + 5}%`, // Portugal
        'RO': `${Math.floor(Math.random() * 26) + 5}%`, // Romania
        'SK': `${Math.floor(Math.random() * 26) + 5}%`, // Slovakia
        'SI': `${Math.floor(Math.random() * 26) + 5}%`, // Slovenia
        'SE': `${Math.floor(Math.random() * 26) + 5}%` // Sweden
    };


        

        // Get discount based on country or default to no discount
        const discount = discounts[geoResponse.countryCode] || 'No discount available';
        //const countryName = geoResponse.country; // remove if causes issues


        // Send response
        res.json({ discount: discount, geoResponse: geoResponse });
    } catch (error) {
        res.status(500).send('Error processing request');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

