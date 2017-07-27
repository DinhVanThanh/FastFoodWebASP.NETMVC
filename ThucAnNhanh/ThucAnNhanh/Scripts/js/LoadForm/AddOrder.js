function ShowAddOrderForm() {
    $('#OrderForm').w2form({
        name: 'OrderForm',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Branch:</label>' +
            '        <div>' +
            '           <input name="Branch" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Customer:</label>' +
            '        <div>' +
            '           <input name="Customer" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Promotion:</label>' +
            '        <div>' +
            '           <input name="Promotion" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Dish:</label>' +
            '        <div>' +
            '           <input name="Dish" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Count:</label>' +
            '        <div>' +
            '           <input name="Count" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'Branch', type: 'text', required: true },
                { field: 'Customer', type: 'text', required: true },
                { field: 'Promotion', type: 'text', required: true },
                { field: 'Dish', type: 'text', required: true },
                { field: 'Count', type: 'text', required: true }
        ],

        actions: {
            "save": function () {
             
                var GiaBan;
                var ChietKhau;
                $.ajax({
                    url: 'GetDishPrice',
                    dataType: 'text',
                    data: { MonAn: "" + $("#Dish").val() },
                    async: false,
                    type: 'post',
                    success: function (string) {
                        
                        GiaBan = parseInt(string);
                      
                    }
                });
                $.ajax({
                    url: 'GetPromotionInterest',
                    dataType: 'text',
                    data: { TenSuKien: "" + $("#Promotion").val() },
                    async: false,
                    type: 'post',
                    success: function (string) {

                        ChietKhau = parseFloat(string) / 100;
                        
                    }
                });
                var a = {
                    MaDonDatHang: "" + (w2ui['Ordergrid'].records.length + 1),
                    ChiNhanh: $("#Branch").val(),
                    Khachhang: $("#Customer").val(),
                    KhuyenMai: $("#Promotion").val(),
                    MonAn: $("#Dish").val(),
                    SoLuong: $("#Count").val(),
                    TinhTrangDonHang: "chưa giao",
                    ThanhTien: parseInt($("#Count").val()) * GiaBan * (1 - ChietKhau),
                    TinhTrangDonHang : "Chưa Giao"
                }
                this.validate();
                $.ajax({
                    url: 'AddOrder',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {
                        w2ui['Ordergrid'].clear();
                        LoadOrderData();
                    }
                });

                w2ui['Ordergrid'].add(a);
                w2ui['Ordergrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="OrderForm" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 400,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.OrderForm.box).hide();
            event.onComplete = function () {
                $(w2ui.OrderForm.box).show();
                w2ui.OrderForm.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #OrderForm').w2render('OrderForm');

                $.ajax({
                    url: 'GetListBranch',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var branch = [];
                        for (var i = 0; i < string.length ; i++) {
                            branch.push({ id: string[i].MaChiNhanh, text: string[i].TenChiNhanh });
                        }
                        $('#Branch').w2field('list', { items: branch });
                    }
                });
                $.ajax({
                    url: 'GetListCustomer',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var customer = [];
                        for (var i = 0; i < string.length ; i++) {
                            customer.push({ id: string[i].MaKhachHang, text: string[i].HoTenKhachHang });
                        }
                        $('#Customer').w2field('list', { items: customer });
                    }
                });
                $.ajax({
                    url: 'GetListPromotion',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var promotion = [];
                        for (var i = 0; i < string.length ; i++) {
                            promotion.push({ id: string[i].MaKhuyenMai, text: string[i].TenSuKien });
                        }
                        $('#Promotion').w2field('list', { items: promotion });
                    }
                });
                $.ajax({
                    url: 'GetListDish',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var Dish = [];
                        for (var i = 0; i < string.length ; i++) {
                            Dish.push({ id: string[i].MaMonAn, text: string[i].TenMonAn });
                        }
                        $('#Dish').w2field('list', { items: Dish });
                        
                    }
                });
            }
        }
    });
}