function LoadBranchData() {
    //ajax
    $.ajax({
        url: 'BranchList',
        dataType: 'json',
        type: 'post',
        success: function (string) {
            w2ui['Branchgrid'].add(string);

        }
    });
}