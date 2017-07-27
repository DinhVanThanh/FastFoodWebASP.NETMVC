function ShowAddMaterialForm() {
    $('#MaterialForm').w2form({
        name: 'MaterialForm',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Material Name:</label>' +
            '        <div>' +
            '           <input name="MaterialName" type="text" maxlength="200" style="width: 250px"/>' +
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
                { field: 'MaterialName', type: 'text', required: true },
                { field: 'Count', type: 'text', required: true },
                { field: 'Note', type: 'text', required: true }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaNguyenLieu: "" + (w2ui['Materialgrid'].records.length + 1),
                    TenNguyenLieu: $("#MaterialName").val(),
                    SoLuong: 0,
                    GhiChu: $("#Note").val()
                }
                this.validate();
                $.ajax({
                    url: 'AddMaterial',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {

                    }
                });

                w2ui['Materialgrid'].add(a);
                w2ui['Materialgrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="MaterialForm" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 300,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.MaterialForm.box).hide();
            event.onComplete = function () {
                $(w2ui.MaterialForm.box).show();
                w2ui.MaterialForm.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #MaterialForm').w2render('MaterialForm');
            }
        }
    });
}