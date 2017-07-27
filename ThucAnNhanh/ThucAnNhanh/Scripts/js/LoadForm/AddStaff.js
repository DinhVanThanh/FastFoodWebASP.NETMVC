function ShowAddStaffForm() {
    $('#formStaff').w2form({
        name: 'formStaff',
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
                '        <label>BirthDay:</label>' +
                '        <div>' +
                '            <input name="BirthDay" type="text" maxlength="100" style="width: 250px"/>' +
                '        </div>' +
                '    </div>' +
                '    <div class="w2ui-field">' +
                '        <label>Gender:</label>' +
                '       <div>' +
                '           <label>' +
                '       <input name="Gender" type="radio" value="Nam" id="field_radio" class="w2ui-input">' +
                '       Male' +
                '       </label>' +
                '       <br>' +
                '       <label>' +
                '       <input name="Gender" type="radio" value="Nu">' +
                '           Female ' +
                '       </label> ' +
                '       </div> ' +
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
                '        <label>Identity Card:</label>' +
                '        <div>' +
                '           <input name="IdentityCard" type="text" maxlength="20" style="width: 250px"/>' +
                '        </div>' +
                '    </div>' +
                '    <div class="w2ui-field">' +
                '        <label>Email:</label>' +
                '        <div>' +
                '           <input name="Email" type="email" maxlength="200" style="width: 250px"/>' +
                '        </div>' +
                '    </div>' +
                '</div>' +
                '<div class="w2ui-buttons">' +
                '    <button class="w2ui-btn" name="reset">Reset</button>' +
                '    <button class="w2ui-btn" name="save">Save</button>' +
                '</div>',
        fields: [
                { field: 'FullName', type: 'text', required: true },
                { field: 'BirthDay', type: 'date' },
                { field: 'Gender', type: 'radio' },
                { field: 'Phone', type: 'text', required: true },
                { field: 'Address', type: 'text', required: true },
                { field: 'IdentityCard', type: 'text' },
                { field: 'Email', type: 'email' }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaNhanVien: "1",
                    HoTen: $("#FullName").val(),
                    NgaySinh: $("#BirthDay").val(),
                    GioiTinh: $("#Gender").val(),
                    SDT: $("#Phone").val(),
                    DiaChi: $("#Address").val(),
                    CMND: $("#IdentityCard").val(),
                    Email: $("#Email").val()
                }
                this.validate();
                $.ajax({
                    url: 'AddStaff',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {
                    }
                });

                w2ui['Staffgrid'].add(a);
                w2ui['Staffgrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="formStaff" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 400,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.formStaff.box).hide();
            event.onComplete = function () {
                $(w2ui.formStaff.box).show();
                w2ui.formStaff.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {
                // specifying an onOpen handler instead is equivalent to specifying an onBeforeOpen handler, which would make this code execute too early and hence not deliver.
                $('#w2ui-popup #formStaff').w2render('formStaff');
            }
        }
    });
}