
function LoadStaffGrid() {

    var GioiTinh = [{ id: "Nam", text: "Nam" }, { id: "Nu", text: "Nu" }];
    $('#grid').w2grid({
        name: 'Staffgrid',
        recid: 'MaNhanVien',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaNhanVien', caption: 'Customer Code', type: 'text' },
            { field: 'HoTen', caption: 'Full Name', type: 'text' },
            { field: 'NgaySinh', caption: 'BirthDay', type: 'text' },
            { field: 'GioiTinh', caption: 'Gender', type: 'text' },
            { field: 'SDT', caption: 'Phone Number', type: 'text' },
            { field: 'DiaChi', caption: 'Address', type: 'text' },
            { field: 'CMND', caption: 'Identity Card', type: 'text' },
            { field: 'Email', caption: 'Email', type: 'text' }
        ],
        columns: [

            { field: 'MaNhanVien', caption: 'Customer Code', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'HoTen', caption: 'Full Name', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'NgaySinh', caption: 'BirthDay', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'date' } },
            { field: 'GioiTinh', caption: 'Gender', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: GioiTinh ,showAll: true } },
            { field: 'SDT', caption: 'Phone Number', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'DiaChi', caption: 'Address', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'CMND', caption: 'Identity Card', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'Email', caption: 'Email', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } }
        ],
        onAdd: function (event) {

            ShowAddStaffForm();
        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteStaff();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateStaff();
        }
    });
}
function UpdateStaff()
{
    
    $.ajax({
        url: 'UpdateStaff',
        data: { a: w2ui['Staffgrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {
           
        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteStaff()
{
    var a = w2ui['Staffgrid'].getSelection();
    $.ajax({
        url: 'DeleteStaff',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}