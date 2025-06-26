document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Format the WhatsApp message
            const whatsappMessage = `New Appointment Request:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nDate: ${date}\nTime: ${time}\nService: ${service}\nAdditional Info: ${message || 'None'}`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Redirect to WhatsApp
            window.location.href = `https://wa.me/233598160732?text=${encodedMessage}`;
            
            // Here you would also send the data to Google Sheets
            // sendToGoogleSheets('appointments', {name, phone, email, date, time, service, message});
        });
    }
    
    // Function to send data to Google Sheets (would need to be implemented with Google Apps Script)
    function sendToGoogleSheets(sheetName, data) {
        // Implementation would depend on your Google Apps Script setup
        console.log(`Data to send to ${sheetName}:`, data);
        // Typically you would use fetch() to call your Google Apps Script web app URL
    }
});