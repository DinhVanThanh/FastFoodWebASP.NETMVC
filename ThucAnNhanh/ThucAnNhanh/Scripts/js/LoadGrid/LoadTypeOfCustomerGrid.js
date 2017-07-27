function LoadTypeofCustomerGrid() {
    $('#gridTypeCustomer').w2grid({
        name: 'TypeofCustomergrid',
        recid: 'MaLoaiKH',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaLoaiKH', caption: 'Customer Code', type: 'text' },
            { field: 'LoaiKH', caption: 'Type Name', type: 'text' },
            { field: 'DiemChuan', caption: 'Promotion Point', type: 'text' }
        ],
        columns: [

            { field: 'MaLoaiKH', caption: 'Customer Code', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'LoaiKH', caption: 'Type Name', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'DiemChuan', caption: 'Promotion Point', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'int' } }
        ],
        onAdd: function (event) {
            ShowAddTypeCustomerForm();

        },

        onDelete: function (event) {
            DeleteTypeOfCustomer();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateTypeOfCustomer();
        },
       

    });
}
function UpdateTypeOfCustomer() {
    
    $.ajax({
        url: 'UpdateTypeOfCustomerList',
        data: { a: w2ui['TypeofCustomergrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteTypeOfCustomer() {
    var a = w2ui['TypeofCustomergrid'].getSelection();
    $.ajax({
        url: 'DeleteTypeOfCustomerList',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}