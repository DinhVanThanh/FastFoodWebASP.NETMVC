function LoadBranchGrid() {
    $('#grid').w2grid({
        name: 'Branchgrid',
        recid: 'MaChiNhanh',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaChiNhanh', caption: 'Branch Code', type: 'text' },
            { field: 'TenChiNhanh', caption: 'Branch Name', type: 'text' },
            { field: 'DiaChi', caption: 'Address', type: 'text' },
            { field: 'Hotline', caption: 'Hotline', type: 'text' }
        ],
        columns: [

            { field: 'MaChiNhanh', caption: 'Branch Code', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'TenChiNhanh', caption: 'Branch Name', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'DiaChi', caption: 'Address', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'Hotline', caption: 'Hotline', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } }            ],
        onAdd: function (event) {

            ShowAddBranchForm();
            
        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteBranch();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateBranch();
        }
    });
}
function UpdateBranch() {

    $.ajax({
        url: 'UpdateBranch',
        data: { a: w2ui['Branchgrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteBranch() {
    var a = w2ui['Branchgrid'].getSelection();
    $.ajax({
        url: 'DeleteBranch',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}