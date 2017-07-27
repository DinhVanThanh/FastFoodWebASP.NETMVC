function ShowAddTaskForm() {
    $('#Taskform').w2form({
        name: 'Taskform',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Branch:</label>' +
            '        <div>' +
            '           <input name="Branch" type="list" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Staff:</label>' +
            '        <div>' +
            '           <input name="Staff" type="list" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Position:</label>' +
            '        <div>' +
            '           <input name="Position" type="list" maxlength="200" style="width: 250px"/>' +
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
                { field: 'Branch', type: 'list', required: true },
                { field: 'Staff', type: 'list', required: true },
                { field: 'Position', type: 'list', required: true },
                { field: 'Note', type: 'text'}
        ],

        actions: {
            "save": function () {
                var total = (w2ui['Taskgrid'].records.length + 1);
                var a = {
                    MaCongViec : 1,
                    ChiNhanh: $("#Branch").val(),
                    NhanVien: $("#Staff").val(),
                    ChucVu: $("#Position").val(),
                    GhiChu: $("#Note").val()
                }
                
                this.validate();
                $.ajax({
                    url: 'AddTask',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {

                    }
                });

                w2ui['Taskgrid'].add(a);
                w2ui['Taskgrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="Taskform" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 350,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.Taskform.box).hide();
            event.onComplete = function () {
                $(w2ui.Taskform.box).show();
                w2ui.Taskform.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #Taskform').w2render('Taskform');
                $.ajax({
                    url: 'GetListBranch',
                    dataType: 'json',
                    async : false,
                    type: 'post',
                    success: function (string) {
                        var branch = [];
                        for (var i = 0; i < string.length ; i++) {
                            branch.push({ MaChiNhanh: string[i].MaChiNhanh, text: string[i].TenChiNhanh });
                        }
                        $('#Branch').w2field('list', { items: branch });
                    }
                });
                $.ajax({
                    url: 'GetListStaff',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var staff = [];
                        for (var i = 0; i < string.length ; i++) {
                            staff.push({ MaNhanVien: string[i].MaNhanVien, text: string[i].HoTen });
                        }
                        $('#Staff').w2field('list', { items: staff });
                    }
                });
                $.ajax({
                    url: 'GetListPosition',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var Position = [];
                        for (var i = 0; i < string.length ; i++) {
                            Position.push({ MaChucVu: string[i].MaChucVu, text: string[i].TenChucVu });
                        }
                        $('#Position').w2field('list', { items: Position });
                    }
                });
                
            }
        }
    });
}