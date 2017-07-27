function LoadMenuData() {
    //ajax
    $.ajax({
        url: 'MenuList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Menugrid'].add(string);

        }
    });
}