function ShowAddDishDetailForm() {
    $('#DishDetailForm').w2form({
        name: 'DishDetailForm',
        style: 'border: 0px; background-color: transparent;',
        formHTML:
            '<div class="w2ui-page page-0">' +
            '    <div class="w2ui-field">' +
            '        <label>Dish:</label>' +
            '        <div>' +
            '           <input name="Dish" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Material:</label>' +
            '        <div>' +
            '           <input name="Material" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '    <div class="w2ui-field">' +
            '        <label>Count:</label>' +
            '        <div>' +
            '           <input name="Count" type="text" maxlength="200" style="width: 250px"/>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="w2ui-buttons">' +
            '    <button class="w2ui-btn" name="reset">Reset</button>' +
            '    <button class="w2ui-btn" name="save">Save</button>' +
            '</div>',
        fields: [
                { field: 'Dish', type: 'list', required: true },
                { field: 'Material', type: 'list', required: true },
                { field: 'Count', type: 'text', required: true }
        ],

        actions: {
            "save": function () {
                var a = {
                    STT: "" + (w2ui['DishDetailgrid'].records.length + 1),
                    MonAn: $("#Dish").val(),
                    NguyenLieu: $("#Material").val(),
                    SoLuong: $("#Count").val()
                }
                this.validate();
                $.ajax({
                    url: 'AddDishDetail',
                    data: {
                        a: a
                    },
                    dataType: 'text',
                    type: 'post',
                    success: function (string) {

                    }
                });

                w2ui['DishDetailgrid'].add(a);
                w2ui['DishDetailgrid'].refresh();
                this.clear();
                w2popup.close();
            },
            "reset": function () { this.clear(); }
        }
    });
    $().w2popup('open', {
        title: 'Form in a Popup',
        body: '<div id="DishDetailForm" style="width: 100%; height: 100%;"></div>',
        style: 'padding: 15px 0px 0px 0px',
        width: 500,
        height: 300,
        showMax: true,
        onToggle: function (event) {
            $(w2ui.DishDetailForm.box).hide();
            event.onComplete = function () {
                $(w2ui.DishDetailForm.box).show();
                w2ui.DishDetailForm.resize();
            }
        },
        onOpen: function (event) {
            event.onComplete = function () {

                $('#w2ui-popup #DishDetailForm').w2render('DishDetailForm');

                $.ajax({
                    url: 'GetListDish',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var Dish = [];
                        for (var i = 0; i < string.length ; i++) {
                            Dish.push({ MaMonAn: string[i].MaMonAn, text: string[i].TenMonAn });
                        }
                        $('#Dish').w2field('list', { items: Dish });
                    }
                });
                $.ajax({
                    url: 'GetListMaterial',
                    dataType: 'json',
                    async: false,
                    type: 'post',
                    success: function (string) {
                        var Material = [];
                        for (var i = 0; i < string.length ; i++) {
                            Material.push({ MaNguyenLieu: string[i].MaNguyenLieu, text: string[i].TenNguyenLieu });
                        }
                        $('#Material').w2field('list', { items: Material });
                    }
                });
            }
        }
    });
}