function LoadTypeofCustomerData() {
    //ajax
    $.ajax({
        url: 'TypeOfCustomerList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['TypeofCustomergrid'].add(string);
            
        }
    });
}