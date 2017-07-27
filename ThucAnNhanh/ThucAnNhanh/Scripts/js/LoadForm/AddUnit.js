function ShowAddUnitForm() {
    $('#UnitForm').w2form({
        name: 'UnitForm',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Unit Name:</label>' +
            '        <div>' +
            '           <input name="UnitName" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'UnitName', type: 'text', required: true }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaDonVi: "" + (w2ui['Unitgrid'].records.length + 1),
                    TenDonVi: $("#UnitName").val()
                }
                this.validate();
                $.ajax({
                    url: 'AddUnit',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {

                    }
                });

                w2ui['Unitgrid'].add(a);
                w2ui['Unitgrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="UnitForm" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 300,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.UnitForm.box).hide();
            event.onComplete = function () {
                $(w2ui.UnitForm.box).show();
                w2ui.UnitForm.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #UnitForm').w2render('UnitForm');
            }
        }
    });
}