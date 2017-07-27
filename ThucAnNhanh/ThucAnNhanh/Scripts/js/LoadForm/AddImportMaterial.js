function ShowAddImportMaterialForm() {


    $('#ImportMaterialForm').w2form({
        name: 'ImportMaterialForm',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Branch :</label>' +
            '        <div>' +
            '           <input name="Branch" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Material:</label>' +
            '        <div>' +
            '           <input name="Material" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Import Date:</label>' +
            '        <div>' +
            '           <input name="ImportDate" type="text" maxlength="50" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Unit:</label>' +
            '        <div>' +
            '           <input name="Unit" type="text" maxlength="50" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Count:</label>' +
            '        <div>' +
            '           <input name="Count" type="text" maxlength="50" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Price:</label>' +
            '        <div>' +
            '           <input name="Price" type="text" maxlength="50" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'Branch', type: 'list', required: true },
                { field: 'Material', type: 'list', required: true },
                { field: 'ImportDate', type: 'date', required: true },
                { field: 'Unit', type: 'list', required: true },
                { field: 'Count', type: 'text', required: true },
                { field: 'Price', type: 'text', required: true }
        ],

        actions: {
            "save": function () {
                var a = {
                    MaNhap: "" + (w2ui['ImportMaterialgrid'].records.length + 1),
                    ChiNhanh: $("#Branch").val(),
                    NguyenLieu: $("#Material").val(),
                    NgayNhap: $("#ImportDate").val(),
                    DonVi: $("#Unit").val(),
                    SoLuong: $("#Count").val(),
                    DonGia: $("#Price").val(),
                    ThanhTien: parseInt($("#Count").val()) * parseInt($("#Price").val())
                }
                //alert(JSON.stringify(a));
                this.validate();
                $.ajax({
                    url: 'AddImportMaterial',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {
                        w2ui['ImportMaterialgrid'].clear();
                        LoadImportMaterialData();
                    }
                });

                w2ui['ImportMaterialgrid'].add(a);
                w2ui['ImportMaterialgrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="ImportMaterialForm" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 320,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.ImportMaterialForm.box).hide();
            event.onComplete = function () {
                $(w2ui.ImportMaterialForm.box).show();
                w2ui.ImportMaterialForm.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #ImportMaterialForm').w2render('ImportMaterialForm');
                $('#w2ui-popup #Taskform').w2render('Taskform');
                $.ajax({
                    url: 'GetListBranch',
                    dataType: 'json',
                    async: false,
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
                    url: 'GetListMaterial',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var material = [];
                        for (var i = 0; i < string.length ; i++) {
                            material.push({ MaNguyenLieu: string[i].MaNguyenLieu, text: string[i].TenNguyenLieu });
                        }
                        $('#Material').w2field('list', { items: material });
                    }
                });
                $.ajax({
                    url: 'GetListUnit',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var Unit = [];
                        for (var i = 0; i < string.length ; i++) {
                            Unit.push({ MaDonVi: string[i].MaDonVi, text: string[i].TenDonVi });
                        }
                        $('#Unit').w2field('list', { items: Unit });
                    }
                });
            }
        }
    });
}