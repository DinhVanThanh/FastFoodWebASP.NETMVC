function ShowAddTypeCustomerForm() {
    $('#TypeOfCustomerform').w2form({
        name: 'TypeOfCustomerform',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Type Name:</label>' +
            '        <div>' +
            '           <input name="TypeName" type="text" maxlength="20" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Promotion Point:</label>' +
            '        <div>' +
            '           <input name="PromotionPoint" type="int" min="0" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'TypeName', type: 'text', required: true },
                { field: 'PromotionPoint', type: 'int', required: true }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaLoaiKH: "" + (w2ui['TypeofCustomergrid'].records.length + 1),
                    LoaiKH: $("#TypeName").val(),
                    DiemChuan: $("#PromotionPoint").val()
                }
                
                this.validate();
                $.ajax({
                    url: 'AddTypeOfCustomerList',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {

                    }
                });

                w2ui['TypeofCustomergrid'].add(a);
                w2ui['TypeofCustomergrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="TypeOfCustomerform" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 200,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.TypeOfCustomerform.box).hide();
            event.onComplete = function () {
                $(w2ui.TypeOfCustomerform.box).show();
                w2ui.TypeOfCustomerform.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {
               
                $('#w2ui-popup #TypeOfCustomerform').w2render('TypeOfCustomerform');
            }
        }
    });
}