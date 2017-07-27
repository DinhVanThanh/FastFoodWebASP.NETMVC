function LoadImportMaterialGrid() {
    var Branch = [];
    $.ajax({
        url: 'GetListBranch',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {

            for (var i = 0; i < string.length ; i++) {
                Branch.push({ MaChiNhanh: string[i].MaChiNhanh, text: string[i].TenChiNhanh });
            }

        }
    });

    var material = [];
    $.ajax({
        url: 'GetListMaterial',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {
           
            for (var i = 0; i < string.length ; i++) {
                material.push({ MaNguyenLieu: string[i].MaNguyenLieu, text: string[i].TenNguyenLieu });
            }
            
        }
    });

    var Unit = [];
    $.ajax({
        url: 'GetListUnit',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {
            
            for (var i = 0; i < string.length ; i++) {
                Unit.push({ MaDonVi: string[i].MaDonVi, text: string[i].TenDonVi });
            }
            
        }
    });
    $('#ImportMaterialgrid').w2grid({
        name: 'ImportMaterialgrid',
        recid: 'MaNhap',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaNhap', caption: 'Import Code', type: 'text' },
            { field: 'ChiNhanh', caption: 'Branch', type: 'text' },
            { field: 'NguyenLieu', caption: 'Material', type: 'text' },
            { field: 'NgayNhap', caption: 'ImportDate', type: 'text' },
            { field: 'DonVi', caption: 'Unit', type: 'text' },
            { field: 'SoLuong', caption: 'Count', type: 'int' },
            { field: 'DonGia', caption: 'Price', type: 'int' },
            { field: 'ThanhTien', caption: 'ToTal Money', type: 'text' }
        ],
        columns: [

            { field: 'MaNhap', caption: 'Import Code', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'ChiNhanh', caption: 'Branch', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: Branch, showAll: true } },
            { field: 'NguyenLieu', caption: 'Material', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: material, showAll: true } },
            { field: 'NgayNhap', caption: 'ImportDate', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'date' } },
            { field: 'DonVi', caption: 'Unit', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: Unit, showAll: true } },
            { field: 'SoLuong', caption: 'Count', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'DonGia', caption: 'Price', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'ThanhTien', caption: 'ToTal Money', size: '12.5%', sortable: true, attr: 'align=center' }
        ],
        onAdd: function (event) {
            ShowAddImportMaterialForm();

        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteImportMaterial();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateImportMaterial();
        }
    });
}

function UpdateImportMaterial() {
    //alert(JSON.stringify(w2ui['ImportMaterialgrid'].getChanges()));
    $.ajax({
        url: 'UpdateImportMaterial',
        data: { a: w2ui['ImportMaterialgrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {
            w2ui['ImportMaterialgrid'].clear();
            LoadImportMaterialData();
        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteImportMaterial() {
    var a = w2ui['ImportMaterialgrid'].getSelection();
    $.ajax({
        url: 'DeleteImportMaterial',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}