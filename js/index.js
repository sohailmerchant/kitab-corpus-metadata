

$(document).ready(function () {
    $('#example').DataTable({
        "autoWidth": false,
        "pageLength": 50,
        //"orderFixed": [ 2, 'des' ],
        "ajax": "db/kitab.json",
        "columns": [

            { "data": "Book URI" },
            {
                "data": "Author",
                "render": function (data, type, row, meta) {
                    s = data.substring(4);
                    return s = s.replace(/([A-Z])/g, ' $1').trim();
                }

            },
            { "data": "Died" },
            {
                "data": "Book Title",
                "render": function (data, type, row, meta) { 
                    return data = data.replace(/([A-Z])/g, ' $1').trim();
               }



            },
            { "data": "Word Count" },
            // { "data": "Full Book URI" },
            { "data": "Source" },
            {
                "data": "Full Text Book URL",
                "render": function (data, type, row, meta) {
                    return '<a href="' + data + '" target="_blank">Read the full text</a>';
                }

            }
        ]
    });
});