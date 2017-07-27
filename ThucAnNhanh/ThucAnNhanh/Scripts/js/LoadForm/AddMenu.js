function ShowAddMenuForm() {
    $('#Menuform').w2form({
        name: 'Menuform',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Dish Name:</label>' +
            '        <div>' +
            '           <input name="DishName" type="text" maxlength="100" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Price:</label>' +
            '        <div>' +
            '           <input name="Price" type="text" maxlength="20" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Count:</label>' +
            '        <div>' +
            '           <input name="Count" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Image:</label>' +
            '        <div>' +
            '           <input name="Image" type="file" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Note:</label>' +
            '        <div>' +
            '           <input name="Note" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'DishName', type: 'text', required: true },
                { field: 'Price', type: 'text', required: true },
                { field: 'Count', type: 'text', required: true },
                { field: 'Image', type: 'file' },
                { field: 'Note', type: 'text' }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaMonAn: "" + (w2ui['Menugrid'].records.length + 1),
                    TenMonAn: $("#DishName").val(),
                    GiaBan: $("#Price").val(),
                    SoLuong: $("#Count").val(),
                    Hinh: $("#Image").val(),
                    GhiChu: $("#Note").val()
                }
                this.validate();
                $.ajax({
                    url: 'AddMenu',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {
                        // alert(string);

                    }
                });

                w2ui['Menugrid'].add(a);
                w2ui['Menugrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="Menuform" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 300,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.Menuform.box).hide();
            event.onComplete = function () {
                $(w2ui.Menuform.box).show();
                w2ui.Menuform.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {
                // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                $('#w2ui-popup #Menuform').w2render('Menuform');
            }
        }
    });
}