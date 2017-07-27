function LoadStaffData() {
    //ajax
    $.ajax({
        url: 'StaffList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Staffgrid'].add(string);

        }
    });
}