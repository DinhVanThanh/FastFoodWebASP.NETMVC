function LoadDishDetailData() {
    //ajax
    $.ajax({
        url: 'DishDetailList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['DishDetailgrid'].add(string);

        }
    });
}