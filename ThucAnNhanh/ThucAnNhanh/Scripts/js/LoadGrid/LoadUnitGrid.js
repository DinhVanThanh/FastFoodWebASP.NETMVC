
function LoadUnitGrid() {
    $('#Unitgrid').w2grid({
        name: 'Unitgrid',
        recid: 'MaDonVi',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaDonVi', caption: 'Unit Code', type: 'text' },
            { field: 'TenDonVi', caption: 'Unit Name', type: 'text' }
        ],
        columns: [

            { field: 'MaDonVi', caption: 'Unit Code', size: '20%', sortable: true, attr: 'align=center' },
            { field: 'TenDonVi', caption: 'Unit Name', size: '80%', sortable: true, attr: 'align=center', editable: { type: 'text' } }
        ],
        onAdd: function (event) {
            ShowAddUnitForm();

        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteUnit();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateUnit();
        }
    });
}

function UpdateUnit()
{
    
    $.ajax({
        url: 'UpdateUnit',
        data: { a: w2ui['Unitgrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {
           
        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteUnit()
{
    var a = w2ui['Unitgrid'].getSelection();
    $.ajax({
        url: 'DeleteUnit',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {
            
        }
    });
}