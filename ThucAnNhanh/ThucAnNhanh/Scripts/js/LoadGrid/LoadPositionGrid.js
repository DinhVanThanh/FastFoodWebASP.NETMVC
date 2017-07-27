function LoadPositionGrid() {
    $('#gridPosition').w2grid({
        name: 'Positiongrid',
        recid: 'MaChucVu',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaChucVu', caption: 'Position Code', type: 'text' },
            { field: 'TenChucVu', caption: 'Position Name', type: 'text' },
            { field: 'MucLuong', caption: 'Salary', type: 'int' }
        ],
        columns: [

            { field: 'MaChucVu', caption: 'Position Code', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'TenChucVu', caption: 'Position Name', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'MucLuong', caption: 'Salary', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'int' } }
        ],
        onAdd: function (event) {
            ShowAddPostitionForm();

        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeletePosition();
        },
        onSave: function (event) {
            w2alert('save');
            UpdatePosition();
        },


    });
}
function UpdatePosition() {

    $.ajax({
        url: 'UpdatePosition',
        data: { a: w2ui['Positiongrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeletePosition() {
    var a = w2ui['Positiongrid'].getSelection();
    $.ajax({
        url: 'DeletePosition',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}