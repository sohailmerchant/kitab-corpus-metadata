$(document).ready(function () {
    var srtContainer;
    $('#example').DataTable({
        "autoWidth": false,
        "pageLength": 50,
        "colReorder": true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'pdfHtml5',
            {
                extend: 'csv',
                filename: 'kitab-corpusmetadata',
                stripHtml: true,
                exportOptions: { orthogonal: 'rawExport' },


            }
        ],

        //"orderFixed": [ 2, 'des' ],
        "ajax": "db/kitab-openITI.json",
        "columns": [
            //  { "data": "versionUri" },

            {
                "data": "id",
                "render": function (data, type, row, meta) {

                    var fullbookuri = row['url'].split('/')[9];
                    return data +
                        "<span class='bugspan'> <a href ='https://github.com/OpenITI/Annotation/issues/new?assignees=&labels=enhancement&template=change-uri.md&title=" + fullbookuri + "' target=_blank title='Change URI - raise issue on GitHub'> <i class='fas fa-bug bug'></i></a></span>";

                }


            },

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
                    data = data.toUpperCase();
                    var fullbookuri = row['url'].split('/')[9];
                    //return data.toUpperCase(); 
                    return data + " <span class='bugspan'> <a href ='https://github.com/OpenITI/Annotation/issues/new?assignees=&labels=question&template=pri-vs-sec.md&title=" + fullbookuri + "' target=_blank title='Change Text Status - raise issue on GitHub'> <i class='fas fa-bug bug'></i></a></span>";


                }

            },
            { "data": "length" },
            {
                "data": "url",
                "render": function (data, type, row, meta) {
                    if (type === 'rawExport') {
                        return data;
                    }
                    var fullbookuri = row['url'].split('/')[9];
                    
                    return '<a href="' + data + '" target="_blank">Read the full text</a>' + "<span class='bugspan'> <a href ='https://github.com/OpenITI/Annotation/issues/new?assignees=&labels=text+quality&template=text-quality-issue-.md&title=" + fullbookuri + "' target=_blank title='Full Text Issue - raise issue on GitHub'> <i class='fas fa-bug bug'></i></a></span>";
                }


            },
            {
                "data": "tags",
                "render": function (data, type, row, meta) {
                    return data = data.replace(/,_|_|,/g, " <br/>")


                }
            },
            {
                "data": "srts",
                "render": function (data, type, row, meta) {
                    if (type === 'rawExport') {
                        return data;
                    }

                    srtContainer = '<div> <a href="' + data[0] + '" target="_blank"> October 2017 </a> <br/> <a href="'
                        + data[1] + '" target="_blank">Feburary 2019</a> <br/><a href="'
                        + data[2] + '" target="_blank">May 2019 (Aggregated)</a> </div>'

                    return srtContainer
                }


            }
        ]
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
