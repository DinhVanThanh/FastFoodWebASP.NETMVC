function LoadDeliveryGrid() {
    var MaDonHang = [];
    $.ajax({
        url: 'GetListOrder',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {
            
            for (var i = 0; i < string.length ; i++) {
                MaDonHang.push({ id: string[i].MaDonDatHang, text: string[i].MaDonDatHang });
            }
            
        }
    });
    var NhanVien = [];
   
    $.ajax({
        url: 'GetListDeliverer',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {
            
            for (var i = 0; i < string.length ; i++) {
                NhanVien.push({ id: string[i].MaNhanVien, text: string[i].HoTen });
            }
            
        }
    });
    $('#DeliveryGrid').w2grid({
        name: 'Deliverygrid',
        recid: 'MaGiaoHang',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaGiaoHang', caption: 'Delivery Code', type: 'text' },
            { field: 'MaDonHang', caption: 'Order Code', type: 'text' },
            { field: 'NguoiGiaoHang', caption: 'Deliverer', type: 'text' },
            { field: 'ThoiGianGiaoHang', caption: 'DeliverDate', type: 'date' }
        ],
        columns: [
            { field: 'MaGiaoHang', caption: 'Delivery Code', size: '20%', sortable: true, attr: 'align=center' },
            { field: 'MaDonHang', caption: 'Order Code', size: '20%', sortable: true, attr: 'align=center', editable: { type: 'list', items: MaDonHang, showAll: true } },
            { field: 'NguoiGiaoHang', caption: 'Deliverer', size: '30%', sortable: true, attr: 'align=center', editable: { type: 'list', items: NhanVien, showAll: true } },
            {
                field: 'ThoiGianGiaoHang', caption: 'DeliverDate', size: '30%', sortable: true, attr: 'align=center', editable: { type: 'date' }, render: 'date:dd/mm/yyyy'
            }
        ],
        onAdd: function (event) {
            ShowAddDeliveryForm();
        },
        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteDelivery();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateDelivery();
        }
    });

}
function UpdateDelivery() {

    $.ajax({
        url: 'UpdateDelivery',
        data: { a: w2ui['Deliverygrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteDelivery() {
    var a = w2ui['Deliverygrid'].getSelection();
    $.ajax({
        url: 'DeleteDelivery',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}