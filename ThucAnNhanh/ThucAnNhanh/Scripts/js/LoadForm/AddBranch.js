function ShowAddBranchForm() {
    $('#Branchform').w2form({
        name: 'Branchform',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Branch Name:</label>' +
            '        <div>' +
            '           <input name="BranchName" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Address:</label>' +
            '        <div>' +
            '           <input name="Address" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>HotLine:</label>' +
            '        <div>' +
            '           <input name="HotLine" type="text" maxlength="12" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'BranchName', type: 'text', required: true },
                { field: 'Address', type: 'text', required: true },
                { field: 'HotLine', type: 'text', required: true }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaChiNhanh: "" + (w2ui['Branchgrid'].records.length + 1),
                    TenChiNhanh: $("#BranchName").val(),
                    DiaChi: $("#Address").val(),
                    Hotline: $("#HotLine").val()
                }
                this.validate();
                $.ajax({
                    url: 'AddBranch',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {

                    }
                });

                w2ui['Branchgrid'].add(a);
                w2ui['Branchgrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="Branchform" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 300,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.Branchform.box).hide();
            event.onComplete = function () {
                $(w2ui.Branchform.box).show();
                w2ui.Branchform.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #Branchform').w2render('Branchform');
            }
        }
    });
}