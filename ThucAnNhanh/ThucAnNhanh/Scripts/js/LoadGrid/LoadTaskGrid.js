function LoadTaskGrid() {

    var Branch = [];
    $.ajax({
        url: 'GetListBranch',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {
           
            for (var i = 0; i < string.length ; i++) {
                Branch.push({ id: string[i].MaChiNhanh, text: string[i].TenChiNhanh });
            }
            
        }
    });

    var Staff = [];
    $.ajax({
        url: 'GetListStaff',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {
            
            for (var i = 0; i < string.length ; i++) {
                Staff.push({ id: string[i].MaNhanVien, text: string[i].HoTen });
            }
            
        }
    });

    var Position = [];
    $.ajax({
        url: 'GetListPosition',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {
            
            for (var i = 0; i < string.length ; i++) {
                Position.push({ id: string[i].MaChucVu, text: string[i].TenChucVu });
            }
            
        }
    });
    $('#grid').w2grid({
        name: 'Taskgrid',
        recid: 'MaCongViec',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaCongViec', caption: 'Task Code', type: 'text' },
            { field: 'ChiNhanh', caption: 'Branch', type: 'text' },
            { field: 'NhanVien', caption: 'Staff', type: 'text' },
            { field: 'ChucVu', caption: 'Position', type: 'text' },
            { field: 'GhiChu', caption: 'Note', type: 'text' }
        ],
        columns: [

            { field: 'MaCongViec', caption: 'Task Code', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'ChiNhanh', caption: 'Branch', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: Branch, showAll: true } },
            { field: 'NhanVien', caption: 'Staff', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: Staff, showAll: true } },
            { field: 'ChucVu', caption: 'Position', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: Position, showAll: true } },
            { field: 'GhiChu', caption: 'Note', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } }
           ],
        onAdd: function (event) {
            ShowAddTaskForm();

        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteTask();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateTask();
        }
    });
}
function UpdateTask() {
    
    $.ajax({
        url: 'UpdateTask',
        data: { a: w2ui['Taskgrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteTask() {
    var a = w2ui['Taskgrid'].getSelection();
    $.ajax({
        url: 'DeleteTask',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}