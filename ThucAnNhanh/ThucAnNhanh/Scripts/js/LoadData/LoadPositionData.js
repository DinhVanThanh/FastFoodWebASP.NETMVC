function LoadPositionData() {
    //ajax
    $.ajax({
        url: 'PositionList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Positiongrid'].add(string);
            
        }
    });
}