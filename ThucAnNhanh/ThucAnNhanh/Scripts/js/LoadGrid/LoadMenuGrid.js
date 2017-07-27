function LoadMenuGrid() {
    $('#grid').w2grid({
        name: 'Menugrid',
        recid: 'MaMonAn',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaMonAn', caption: 'Dish Code', type: 'text' },
            { field: 'TenMonAn', caption: 'Dish Name', type: 'text' },
            { field: 'GiaBan', caption: 'Price', type: 'text' },
            { field: 'SoLuong', caption: 'Count', type: 'text' },
            { field: 'Hinh', caption: 'Image', type: 'text' },
            { field: 'GhiChu', caption: 'Note', type: 'text' }
        ],
        columns: [

            { field: 'MaMonAn', caption: 'Dish Code', size: '10%', sortable: true, attr: 'align=center' },
            { field: 'TenMonAn', caption: 'Dish Name', size: '18%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'GiaBan', caption: 'Price', size: '18%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'SoLuong', caption: 'Count', size: '18%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'Hinh', caption: 'Image', size: '18%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'GhiChu', caption: 'Note', size: '18%', sortable: true, attr: 'align=center', editable: { type: 'text' } }
        ],
        onAdd: function (event) {
            ShowAddMenuForm();

        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteMenu();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateMenu();
        }
    });
}
function UpdateMenu() {
    //alert(JSON.stringify(w2ui['Menugrid'].getChanges()));
    $.ajax({
        url: 'UpdateMenu',
        data: { a: w2ui['Menugrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteMenu() {
    var a = w2ui['Menugrid'].getSelection();
    $.ajax({
        url: 'DeleteMenu',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}