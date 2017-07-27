function LoadTaskData() {
    //ajax
    $.ajax({
        url: 'TaskList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Taskgrid'].add(string);

        }
    });
}