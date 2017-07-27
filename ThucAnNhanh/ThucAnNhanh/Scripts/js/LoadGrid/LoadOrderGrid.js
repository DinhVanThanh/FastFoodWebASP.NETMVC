function LoadOrderGrid() {
    var KhachHang = [];
    $.ajax({
        url: 'GetListCustomer',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {

            for (var i = 0; i < string.length ; i++) {
                KhachHang.push({ id: string[i].MaKhachHang, text: string[i].HoTenKhachHang });
            }

        }
    });
    var ChiNhanh = [];
    $.ajax({
        url: 'GetListBranch',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {

            for (var i = 0; i < string.length ; i++) {
                ChiNhanh.push({ id: string[i].MaChiNhanh, text: string[i].TenChiNhanh });
            }

        }
    });
    var KhuyenMai = [];
    $.ajax({
        url: 'GetListPromotion',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {

            for (var i = 0; i < string.length ; i++) {
                KhuyenMai.push({ id: string[i].MaKhuyenMai, text: string[i].TenSuKien });
            }

        }
    });
    var MonAn = [];
    $.ajax({
        url: 'GetListDish',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {

            for (var i = 0; i < string.length ; i++) {
                MonAn.push({ id: string[i].MaMonAn, text: string[i].TenMonAn });
            }

        }
    });
    $('#grid').w2grid({
        name: 'Ordergrid',
        recid: 'MaDonDatHang',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaDonDatHang', caption: 'Order Code', type: 'text' },
            { field: 'ChiNhanh', caption: 'Branch', type: 'text' },
            { field: 'Khachhang', caption: 'Customer', type: 'text' },
            { field: 'KhuyenMai', caption: 'Promotion', type: 'text' },
            { field: 'MonAn', caption: 'Dish', type: 'text' },
            { field: 'SoLuong', caption: 'Count', type: 'int' },
            { field: 'TinhTrangDonHang', caption: 'Order Status', type: 'text' }
        ],
        columns: [

            { field: 'MaDonDatHang', caption: 'Order Code', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'ChiNhanh', caption: 'Branch', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: ChiNhanh, showAll: true } },
            { field: 'Khachhang', caption: 'Customer', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: KhachHang, showAll: true } },
            { field: 'KhuyenMai', caption: 'Promotion', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: KhuyenMai, showAll: true } },
            { field: 'MonAn', caption: 'Dish', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: MonAn, showAll: true } },
            { field: 'SoLuong', caption: 'Count', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'int' } },
            { field: 'TinhTrangDonHang', caption: 'Order Status', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'ThanhTien', caption: 'Total Money', size: '12.5%', sortable: true, attr: 'align=center' }
        ],
        onAdd: function (event) {
            ShowAddOrderForm();
        },
        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteOrder();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateOrder();
        }
    });
    
}
function UpdateOrder() {

    $.ajax({
        url: 'UpdateOrder',
        data: { a: w2ui['Ordergrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {
            w2ui['Ordergrid'].clear();
            LoadOrderData();
        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteOrder() {
    var a = w2ui['Ordergrid'].getSelection();
    $.ajax({
        url: 'DeleteOrder',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}