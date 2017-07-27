function LoadOrderData() {
    //ajax
    $.ajax({
        url: 'OrderList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Ordergrid'].add(string);

        }
    });
}