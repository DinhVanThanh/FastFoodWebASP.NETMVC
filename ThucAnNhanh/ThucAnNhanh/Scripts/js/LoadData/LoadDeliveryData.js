function LoadDeliveryData() {
    //ajax
    $.ajax({
        url: 'DeliveryList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Deliverygrid'].add(string);
            console.log(string);
        }
    });
}