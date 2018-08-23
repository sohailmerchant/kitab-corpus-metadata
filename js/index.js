$(document).ready(function () {

    $('#example').DataTable({
        "autoWidth": false,
        "pageLength": 50,
        "colReorder": true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],

        //"orderFixed": [ 2, 'des' ],
        "ajax": "db/kitab.json",
        "columns": [
            //  { "data": "versionUri" },
            { "data": "id" },
            { "data": "date" },
            {
                "data": "author",
                "render": function (data, type, row, meta) {
                    s = data.substring(4);
                    return s = s.replace(/([A-Z])/g, ' $1').trim();
                }
            },

            {
                "data": "book",
                "render": function (data, type, row, meta) {
                    var i = data.indexOf('.')
                    data = data.substring(i + 1);
                    return data = data.replace(/([A-Z])/g, ' $1').trim();

                }

            },

            {
                "data": "status",
                "render": function (data, type, row, meta) {

                    return data.toUpperCase();
                }

            },
            { "data": "length" },
            {
                "data": "url",
                "render": function (data, type, row, meta) {
                    return '<a href="' + data + '" target="_blank">Read the full text</a>';
                }


            }
            }
        ]
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
