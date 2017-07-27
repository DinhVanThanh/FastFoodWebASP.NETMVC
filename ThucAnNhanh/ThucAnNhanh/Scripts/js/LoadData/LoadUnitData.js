function LoadUnitData() {
    //ajax
    $.ajax({
        url: 'UnitList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Unitgrid'].add(string);
        }
    });
}