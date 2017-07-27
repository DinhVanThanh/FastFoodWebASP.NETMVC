function LoadFeedbackData() {
    //ajax
    $.ajax({
        url: 'FeedbackList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['FeedbackGrid'].add(string);

        }
    });
}