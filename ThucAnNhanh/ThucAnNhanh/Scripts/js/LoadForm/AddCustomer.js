function ShowAddForm() {
    $('#form').w2form({
        name: 'form',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Full Name:</label>' +
            '        <div>' +
            '           <input name="FullName" type="text" maxlength="100" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Phone Number:</label>' +
            '        <div>' +
            '           <input name="Phone" type="text" maxlength="20" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Address:</label>' +
            '        <div>' +
            '           <input name="Address" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Email:</label>' +
            '        <div>' +
            '           <input name="Email" type="email" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Type:</label>' +
            '        <div>' +
            '           <input name="Type" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'FullName', type: 'text', required: true },
                { field: 'Phone', type: 'text', required: true },
                { field: 'Address', type: 'text', required: true },
                { field: 'Email', type: 'text' },
                { field: 'Type', type: 'text', required: true }
        ],

        actions: {
            "save": function () {
               var a = {
                    MaKhachHang: "1",
                    HoTenKhachHang: $("#FullName").val(),
                    SDT: $("#Phone").val(),
                    DiaChi: $("#Address").val(),
                    Email: $("#Email").val(),
                    LoaiKH: $("#Type").val()
                }
                this.validate();
                $.ajax({
                    url: 'AddCustomer',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {
                       // alert(string);
                        
                    }
                });
                
                w2ui['Customergrid'].add(a);
                w2ui['Customergrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="form" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 300,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.form.box).hide();
            event.onComplete = function () {
                $(w2ui.form.box).show();
                w2ui.form.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {
                // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                $('#w2ui-popup #form').w2render('form');

                $.ajax({
                    url: 'GetListTypeOfCustomer',
                    dataType: 'json',
                    async : false,
                    type: 'post',
                    success: function (string) {
                        var Type = [];
                        for (var i = 0; i < string.length ; i++) {
                            Type.push({ id: string[i].MaLoaiKH, text: string[i].LoaiKH });
                        }
                        $('#Type').w2field('list', { items: Type });
                    }
                });
            }
        }
    });
}