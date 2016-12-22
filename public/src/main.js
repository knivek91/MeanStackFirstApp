var jq = $(document);
var main = function ()  {
    // private scope
    
    // public scope
    return {
        creteTableStructure: function creteTableStructure(data) {
            data = data || [];
            var $table = jq.find('#tblData');
            $table.bootstrapTable('destroy');
            $table.bootstrapTable({
                data: data,
                cache: false,
                height: 494,
                striped: false,
                pagination: false,
                sortable: true,
                sortOrder: 'asc',
                showToggle: false,
                showPaginationSwitch: false,
                pageSize: 10,
                pageList: [10, 20, 30, 150, 250, 350, 500],
                search: true,
                showColumns: false,
                showRefresh: false,
                minimumCountColumns: 2,
                rowAttributes: function (row, index) { return { 'data-guid': row.Guid }; },
                columns: [{
                    field: 'user',
                    title: 'Name',
                    sortable: true
                }, {
                    field: 'age',
                    title: 'Age',
                    sortable: true
                }]
            });
        }
        , getPeople: function getPeople() {
            var items = [];
            var req = $.ajax({ url: '/getDocs', type: 'POST', async: false}).responseText;
            try{ items = JSON.parse(req); } catch(err) { items = []; }
            return items;
        }
        , addPerson: function addPerson(user, age) {
            if(user == '')
                return 'Please fill the name.';
            if(age == '')
                return 'Please fill the age.';
            if(isNaN(age))
                return 'The age entered must be a number.';
            
            var req = $.ajax({ url: '/insertDoc', type: 'POST', async: false, data: { user: user, age: age } }).responseText;
            
            return req;
        }
        , reLoadTable: function reloadTable($table, data) {
            data = data || [];
            $table.bootstrapTable('load', data);
        }
    };
};

var Main = main();

jq.ready(function () {
    var items = Main.getPeople();
    Main.creteTableStructure(items); 
});

jq.find('#btnSave').on('click', function () {
   var user = jq.find('input[name="txtUser"]').val(); 
   var age = jq.find('input[name="txtAge"]').val();
    
    var result = Main.addPerson(user, age);
    
    if(result == '') {
        toastr.success('Save It');
        var items = Main.getPeople();
        var $table = jq.find('#tblData');
        Main.reLoadTable($table, items);
    } else {
        toastr.error('Cannot save the data.');
    }
    
});