function ShowAddPostitionForm() {
    $('#Positionform').w2form({
        name: 'Positionform',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Position Name:</label>' +
            '        <div>' +
            '           <input name="PositionName" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Salary:</label>' +
            '        <div>' +
            '           <input name="Salary" type="text" maxlength="10" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'PositionName', type: 'text', required: true },
                { field: 'Salary', type: 'text', required: true }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaChucVu: "" + (w2ui['Positiongrid'].records.length + 1),
                    TenChucVu: $("#PositionName").val(),
                    MucLuong: $("#Salary").val()
                }

                this.validate();
                $.ajax({
                    url: 'AddPosition',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {

                    }
                });

                w2ui['Positiongrid'].add(a);
                w2ui['Positiongrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="Positionform" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 200,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.Positionform.box).hide();
            event.onComplete = function () {
                $(w2ui.Positionform.box).show();
                w2ui.Positionform.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #Positionform').w2render('Positionform');
            }
        }
    });
}