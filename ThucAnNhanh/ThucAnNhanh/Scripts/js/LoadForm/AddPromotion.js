function ShowAddPromotionForm() {
    $('#PromotionForm').w2form({
        name: 'PromotionForm',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Promotion Name:</label>' +
            '        <div>' +
            '           <input name="PromotionName" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Content:</label>' +
            '        <div>' +
            '           <input name="Content" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Interest:</label>' +
            '        <div>' +
            '           <input name="Interest" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Start Date:</label>' +
            '        <div>' +
            '           <input name="StartDate" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>End Date:</label>' +
            '        <div>' +
            '           <input name="EndDate" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Image:</label>' +
            '        <div>' +
            '           <input name="Image" type="file" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'PromotionName', type: 'text', required: true },
                { field: 'Content', type: 'text', required: true },
                { field: 'Interest', type: 'float', required: true },
                { field: 'StartDate', type: 'date', required: true },
                { field: 'EndDate', type: 'date', required: true },
                { field: 'Image', type: 'file', required: true }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaKhuyenMai: "" + (w2ui['Promotiongrid'].records.length + 1),
                    TenSuKien: $("#PromotionName").val(),
                    NoiDung: $("#Content").val(),
                    ChietKhau: $("#Interest").val(),
                    ThoiGianBD: $("#StartDate").val(),
                    ThoiGianKT: $("#EndDate").val(),
                    Hinh: $("#Image").val()
                }
                this.validate();
                $.ajax({
                    url: 'AddPromotion',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {

                    }
                });

                w2ui['Promotiongrid'].add(a);
                w2ui['Promotiongrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="PromotionForm" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 300,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.PromotionForm.box).hide();
            event.onComplete = function () {
                $(w2ui.PromotionForm.box).show();
                w2ui.PromotionForm.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #PromotionForm').w2render('PromotionForm');
            }
        }
    });
}