function LoadPromotionGrid() {
    $('#grid').w2grid({
        name: 'Promotiongrid',
        recid: 'MaKhuyenMai',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: true,
            toolbarDelete: true,
            toolbarSave: true

        },
        searches: [
            { field: 'MaKhuyenMai', caption: 'Promotion Code', type: 'text' },
            { field: 'TenSuKien', caption: 'Promotion Name', type: 'text' },
            { field: 'NoiDung', caption: 'Content', type: 'text' },
            { field: 'ChietKhau', caption: 'Interest', type: 'float' },
            { field: 'ThoiGianBD', caption: 'StartDate', type: 'date' },
            { field: 'ThoiGianKT', caption: 'EndDate', type: 'date' }
        ],
        columns: [

            { field: 'MaKhuyenMai', caption: 'Promotion Code', size: '12.5%', sortable: true, attr: 'align=center' },
            { field: 'TenSuKien', caption: 'Promotion Name', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'NoiDung', caption: 'Content', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } },
            { field: 'ChietKhau', caption: 'Interest', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'float' } },
            { field: 'ThoiGianBD', caption: 'StartDate', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'date' } },
            { field: 'ThoiGianKT', caption: 'EndDate', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'date' } },
            { field: 'Hinh', caption: 'Image', size: '12.5%', sortable: true, attr: 'align=center', editable: { type: 'text' } }
        ],
        onAdd: function (event) {
            ShowAddPromotionForm();

        },

        onDelete: function (event) {
            console.log('delete has default behavior');
            DeletePromotion();
        },
        onSave: function (event) {
            w2alert('save');
            UpdatePromotion();
        }
    });
}
function UpdatePromotion() {

    $.ajax({
        url: 'UpdatePromotion',
        data: { a: w2ui['Promotiongrid'].getChanges() },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        },
        error: function (loi) {
            alert("Lỗi");
        }
    });
}

function DeletePromotion() {
    var a = w2ui['Promotiongrid'].getSelection();
    $.ajax({
        url: 'DeletePromotion',
        data: { a: a },
        dataType: 'text',
        type: 'post',
        success: function (string) {

        }
    });
}