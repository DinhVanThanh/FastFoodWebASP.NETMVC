function ShowAddDeliveryForm() {
    $('#Deliveryform').w2form({
        name: 'Deliveryform',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Order Code:</label>' +
            '        <div>' +
            '           <input name="OrderCode" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Deliverer:</label>' +
            '        <div>' +
            '           <input name="Deliverer" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Delivery Date:</label>' +
            '        <div>' +
            '           <input name="DeliveryDate" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'OrderCode', type: 'text', required: true },
                { field: 'Deliverer', type: 'text', required: true },
                { field: 'DeliveryDate', type: 'date', required: true }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaGiaoHang: "" + (w2ui['Deliverygrid'].records.length + 1),
                    MaDonHang: $("#OrderCode").val(),
                    NguoiGiaoHang: $("#Deliverer").val(),
                    ThoiGianGiaoHang: $("#DeliveryDate").val()
                }
                this.validate();
                $.ajax({
                    url: 'AddDelivery',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {

                    }
                });

                w2ui['Deliverygrid'].add(a);
                w2ui['Deliverygrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="Deliveryform" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 300,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.Deliveryform.box).hide();
            event.onComplete = function () {
                $(w2ui.Deliveryform.box).show();
                w2ui.Deliveryform.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #Deliveryform').w2render('Deliveryform');

                $.ajax({
                    url: 'GetListOrder',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var Order = [];
                        for (var i = 0; i < string.length ; i++) {
                            Order.push({ id: string[i].MaDonDatHang, text: string[i].MaDonDatHang });
                        }
                        $('#OrderCode').w2field('list', { items: Order });
                    }
                });
                $.ajax({
                    url: 'GetListDeliverer',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var Deliverer = [];
                        for (var i = 0; i < string.length ; i++) {
                            Deliverer.push({ id: string[i].MaNhanVien, text: string[i].HoTen });
                        }
                        $('#Deliverer').w2field('list', { items: Deliverer });
                    }
                });
            }
        }
    });
}