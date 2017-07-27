function LoadPromotionData() {
    //ajax
    $.ajax({
        url: 'PromotionList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Promotiongrid'].add(string);

        }
    });
}