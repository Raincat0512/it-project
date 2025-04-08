function logout() {
    localStorage.removeItem('isStaffLoggedIn'); 
    window.alert("you have logout")
}

var LostItemManager = (function () {
    var lostItems = JSON.parse(localStorage.getItem('lostItems')) || [];
    function saveToLocalStorage() {
        localStorage.setItem('lostItems', JSON.stringify(lostItems));
    }

    function check_data_valid(itemData) {
        if (!itemData.name || !itemData.details || !itemData.lossDateTime) {
            return false;
        }

        var dateLost = new Date(itemData.lossDateTime);
        if (isNaN(dateLost.getTime())) {
            return false;
        }
        return true;
    }

    function store_lost_item(itemData) {
        if (check_data_valid(itemData)) {
            itemData.id = Date.now();
            lostItems.push(itemData);
            saveToLocalStorage();
            return true;
        } else {
            return false;
        }
    }

    function display_lost_items() {
        if (lostItems.length === 0) {
            alert("No lost items found.");
            return;
        }

        alert("Lost Items:");
        for (var i = 0; i < lostItems.length; i++) {
            var index1 = i + 1;
            alert(
                "Item " + index1 + ":\n" +
                "Name: " + lostItems[i].name + "\n" +
                "Description: " + lostItems[i].details + "\n" +
                "Date Lost: " + lostItems[i].lossDateTime + "\n" +
                "-----------"
            );
        }
    }

    function get_lost_items() {
        return lostItems;
    }

    function handle_form_submission(event) {
        event.preventDefault();
        var reportDate = document.getElementById('reportDate').value;
        var name = document.getElementById('name').value;
        var idNumber = document.getElementById('idNumber').value;
        var contactNumber = document.getElementById('contactNumber').value;
        var email = document.getElementById('email').value;
        var lossDateTime = document.getElementById('lossDateTime').value;
        var lostLocation = document.getElementById('lostLocation').value;
        var lostItem = document.getElementById('lostItem').value;
        var details = document.getElementById('details').value;

        if (lostLocation === 'Other') {
            lostLocation = document.getElementById('otherLocation').value;
        }
        if (lostItem === 'Other') {
            lostItem = document.getElementById('otherItem').value;
        }

        var itemData = {
            reportDate: reportDate,
            name: name,
            idNumber: idNumber,
            contactNumber: contactNumber,
            email: email,
            lossDateTime: lossDateTime,
            lostLocation: lostLocation,
            lostItem: lostItem,
            details: details
        };

        if (store_lost_item(itemData)) {
            alert("Lost item submitted successfully!");
            window.location.href = 'homepage.html';
        } else {
            alert("Invalid data. Please check your input.");
        }
    }

    function searchLostItems(query) {
        return lostItems.filter(item => 
            item.name.includes(query) || 
            item.details.includes(query) ||
            item.lossDateTime.includes(query) ||
            item.lostLocation.includes(query) ||
            item.lostItem.includes(query));
    }

    function markItemFound(id) {
        let item = lostItems.find(item => item.id === id);
        if (item) {
            item.found = true;
            saveToLocalStorage(); // Ensure we save changes to localStorage
            return true;
        }
        return false;
    }

    return {
        storeLostItem: store_lost_item,
        displayLostItems: display_lost_items,
        handleFormSubmission: handle_form_submission,
        searchLostItems: searchLostItems,
        markItemFound: markItemFound,
        getLostItems: get_lost_items,
    };
})();