function LoadCustomerGrid() {
    
    var Type = [];

    $.ajax({
        url: 'TypeOfCustomerList',
        dataType: 'json',
        async  :false,
        type: 'post',
        success: function (string) {
            for (var i = 0; i < string.length ; i++) {
                Type.push({ MaLoaiKH: string[i].MaLoaiKH, text: string[i].LoaiKH });
            }
        }
    });
        
    $('#grid').w2grid({
        name: 'Customergrid',
        recid: 'MaKhachHang',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaKhachHang', caption: 'Customer Code', type: 'text' },
            { field: 'HoTenKhachHang', caption: 'Full Name', type: 'text' },
            { field: 'SDT', caption: 'Phone Number', type: 'text' },
            { field: 'DiaChi', caption: 'Address', type: 'text' },
            { field: 'Email', caption: 'Email', type: 'text' },
            { field: 'LoaiKH', caption: 'Type', type: 'text' },
            { field: 'DiemTichLuy', caption: 'Bonus Point', type: 'int' }
        ],
        columns: [

            { field: 'MaKhachHang', caption: 'Customer Code', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'HoTenKhachHang', caption: 'Full Name', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'SDT', caption: 'Phone Number', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'DiaChi', caption: 'Address', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'Email', caption: 'Email', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'LoaiKH', caption: 'Type', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: Type, showAll: true } },
            { field: 'DiemTichLuy', caption: 'Bonus Point', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'int' } }
        ],
        onAdd: function (event) {
            ShowAddForm();
            
        },
        onDelete: function (event) {
            console.log('delete has default behavior');
            Delete();
        },
        onSave: function (event) {
            Update();
        }
    });
}
function Update()
{
    
    $.ajax({
        url: 'UpdateCustomer',
        data : {a : w2ui['Customergrid'].getChanges()},
        dataType: 'text',
        type: 'post',
        success: function (string) {
           
        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function Delete()
{
    var a = w2ui['Customergrid'].getSelection();
    $.ajax({
        url: 'DeleteCustomer',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {
            
        }
    });
}

