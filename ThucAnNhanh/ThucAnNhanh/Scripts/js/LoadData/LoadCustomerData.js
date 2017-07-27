function LoadCustomerData() {
    //ajax
    $.ajax({
        url: 'CustomerList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Customergrid'].add(string);

        },
        error: function (string) {
            alert("Lỗi");
        }
    });
}