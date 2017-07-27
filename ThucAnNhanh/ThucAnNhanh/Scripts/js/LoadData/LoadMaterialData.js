function LoadMaterialData() {
    //ajax
    $.ajax({
        url: 'MaterialList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Materialgrid'].add(string);
        }
    });
}