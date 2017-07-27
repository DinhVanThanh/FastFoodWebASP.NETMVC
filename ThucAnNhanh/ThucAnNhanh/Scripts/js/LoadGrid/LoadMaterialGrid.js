function LoadMaterialGrid() {
    $('#Materialgrid').w2grid({
        name: 'Materialgrid',
        recid: 'MaNguyenLieu',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaNguyenLieu', caption: 'Material Code', type: 'text' },
            { field: 'TenNguyenLieu', caption: 'Material Name', type: 'text' },
            { field: 'SoLuong', caption: 'Count', type: 'text' }
        ],
        columns: [

            { field: 'MaNguyenLieu', caption: 'Material Code', size: '20%', sortable: true, attr: 'align=center' },
            { field: 'TenNguyenLieu', caption: 'Material Name', size: '30%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'SoLuong', caption: 'Count', size: '15%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'GhiChu', caption: 'Note', size: '35%', sortable: true, attr: 'align=center', editable: { type: 'text' } }
        ],
        onAdd: function (event) {
            ShowAddMaterialForm();

        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteMaterial();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateMaterial();
        }
    });
}

function UpdateMaterial() {

    $.ajax({
        url: 'UpdateMaterial',
        data: { a: w2ui['Materialgrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteMaterial() {
    var a = w2ui['Materialgrid'].getSelection();
    $.ajax({
        url: 'DeleteMaterial',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}