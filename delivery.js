document.addEventListener('DOMContentLoaded', function() {
    const deliveryForm = document.getElementById('deliveryForm');
    
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('delivery-name').value;
            const phone = document.getElementById('delivery-phone').value;
            const email = document.getElementById('delivery-email').value;
            const address = document.getElementById('delivery-address').value;
            const items = document.getElementById('delivery-items').value;
            const instructions = document.getElementById('delivery-instructions').value;
            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            
            // Format the WhatsApp message
            const whatsappMessage = `New Delivery Request:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nAddress: ${address}\nItems: ${items}\nInstructions: ${instructions || 'None'}\nPayment Method: ${paymentMethod}`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Redirect to WhatsApp
            window.location.href = `https://wa.me/233598160732?text=${encodedMessage}`;
            
            // Here you would also send the data to Google Sheets
            // sendToGoogleSheets('deliveries', {name, phone, email, address, items, instructions, paymentMethod});
        });
    }
});