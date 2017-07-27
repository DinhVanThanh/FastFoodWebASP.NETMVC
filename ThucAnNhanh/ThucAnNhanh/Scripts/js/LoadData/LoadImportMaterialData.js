function LoadImportMaterialData() {
    //ajax
    $.ajax({
        url: 'ImportMaterialList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['ImportMaterialgrid'].add(string);
        }
    });
}