function LoadDishDetailGrid() {
    var Dish = [];
    $.ajax({
        url: 'GetListDish',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {
           
            for (var i = 0; i < string.length ; i++) {
                Dish.push({ id: string[i].MaMonAn, text: string[i].TenMonAn });
            }
           
        }
    });

    var nguyenlieu = [];
    $.ajax({
        url: 'GetListMaterial',
        dataType: 'json',
        async: false,
        type: 'post',
        success: function (string) {
            
            for (var i = 0; i < string.length ; i++) {
                nguyenlieu.push({ id: string[i].MaNguyenLieu, text: string[i].TenNguyenLieu });
            }
            
        }
    });
    //alert(JSON.stringify(nguyenlieu));
    $('#DishDetailgrid').w2grid({
        name: 'DishDetailgrid',
        recid: 'STT',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'STT', caption: 'STT', type: 'text' },
            { field: 'MonAn', caption: 'Dish', type: 'text' },
            { field: 'NguyenLieu', caption: 'Material', type: 'text' },
            { field: 'SoLuong', caption: 'Count', type: 'text' }
        ],
        columns: [
            { field: 'STT', caption: 'STT', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'MonAn', caption: 'Dish', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list', items: Dish, showAll: true } },
            { field: 'NguyenLieu', caption: 'Material', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'list' }, items: nguyenlieu, showAll: true },
            { field: 'SoLuong', caption: 'Count', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'int' } }
        ],
        onAdd: function (event) {
            ShowAddDishDetailForm();

        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeleteDishDetail();
        },
        onSave: function (event) {
            w2alert('save');
            UpdateDishDetail();
        }
    });
}
function UpdateDishDetail() {
   // alert(JSON.stringify(w2ui['DishDetailgrid'].getChanges()));
    $.ajax({
        url: 'UpdateDishDetail',
        data: { a: w2ui['DishDetailgrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeleteDishDetail() {
    var a = w2ui['DishDetailgrid'].getSelection();
    $.ajax({
        url: 'DeleteDishDetail',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}