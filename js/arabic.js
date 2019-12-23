

//var url = "https://raw.githubusercontent.com/sohailmerchant/js-dev-env/master/kitab-openITI.json"
var url = "https://raw.githubusercontent.com/OpenITI/Annotation/master/OpenITI_metadata_light.json"
//var urlcsv = "https://raw.githubusercontent.com/OpenITI/Annotation/master/OpenITI_metadata_light.csv"
//var totalRecords;
var table;

// function csvJSON(csv) {
//     var lines = csv.split("\n");
//     var result = [];
//     var headers = lines[0].split(",");

//     for (var i = 1; i < lines.length; i++) {
//         var obj = {};
//         var currentline = lines[i].split(",");

//         for (var j = 0; j < headers.length; j++) {
//             obj[headers[j]] = currentline[j];
//         }
//         result.push(obj);
//     }
//     //JSON object
//     return JSON.stringify(result);
// }

$(document).ready(function () {

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    // var return_first;
    // var myData = [];

    var srtContainer;
    var count;


    function checknull(data) {

        if (data != null) {
            return data;
        }
        else {
            return '';
        }

    }



    table = $('#example').DataTable({


       "sDom": '<"wrapper"lfptip>',
       
        "autoWidth": false,

        "createdRow": function (row, data, dataIndex) {

            if (data['url'].includes('completed') || data['url'].includes('inProgress') || data['url'].includes('mARkdown') ) {
                  
                $(row).addClass('completed');
             

            }

        },



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


            },


            {
                text: 'All',
                action: function (e, dt, node, config) {
                    table.draw();
                }
            },


        ],

        //"orderFixed": [ 2, 'des' ],
        //"processing": true,
        "ajax": "db/arabic-metadata-pv.json",
    


        // "ajax": {
        //     //async: false,
        //     //     'type': "GET",
        //     //     'dataType': 'text',
        //     'url': url,

        "columns": [



            
            { "data": 'id',
            
            "render": function(data, type, row){

             if(row['status']==='pri'){

               // return  "<div>" + row['id'] + "<br/>" + row['status'].toUpperCase() + "</div>";
               return  "<div>" + row['id'] + "<br/> <i class='fas fa-record-vinyl pri' title='"+ row['status'] + "'></i></div>";
             }else{
                return  "<div>" + row['id'] + "<br/> <i class='fas fa-record-vinyl sec' title='"+ row['status'] + "'></i></div>";
             
             }

            }
            },
            

            {
                "data": "book",
                "render": function (data, type, row, meta) {

                    if (type === 'rawExport') {
                        return data;
                    }



                    var i = data.indexOf('.')
                    data = data.substring(i + 1);
                    data = data.replace(/([A-Z])/g, ' $1').trim();

                    var fullbookuri = row['url'].split('/')[9];

                    var defaultLink = '<strong><a href="' + row['url'] + '" target="_blank" title="' + row['url'] + '">' + data + '</a><br/></strong>' + row['title'];

                    if (row['url'].includes('.completed')) {

                        $('tr').addClass('completed')

                    }

                    var opentag = '<span class="issues">'
                    var textQuality = "<a href='https://github.com/OpenITI/Annotation/issues/new?assignees=&labels=text+quality&template=text-quality-issue-.md&title=" + fullbookuri + "'target=_blank title='Full Text Quality Issue - raise issue on GitHub'> <i class='fas fa-bug bug' aria-hidden='true'></i></a>";
                    var inProgress = " <a href='https://github.com/OpenITI/Annotation/issues/new?assignees=&labels=in+progress&template=in-progress.md&title=IN+PROGRESS: " + fullbookuri + "'target=_blank title='Report Text In Progress  - raise issue on GitHub'> <i class='fas fa-tasks bug' aria-hidden='true'></i></a>";
                    var completedText = "<a href='https://github.com/OpenITI/Annotation/issues/new?assignees=&labels=text+tagged&template=submission-report--for-pull-requests-.md&title=" + fullbookuri + "'target=_blank title='Report Text Tagged - raise issue on GitHub'> <i class='fas fa-tag bug'aria-hidden='true' ></i></a>";
                    var changeUri = "<a href ='https://github.com/OpenITI/Annotation/issues/new?assignees=&labels=enhancement&template=change-uri.md&title=" + fullbookuri + "' target=_blank title='Change URI - raise issue on GitHub'> <i class='fas fa-exchange-alt bug' aria-hidden='true'></i></a>"
                    var endtag = '</span>'

                    return defaultLink + "<br/><br/>Raise an issue/report <br/>" + opentag + changeUri + textQuality + completedText + inProgress + endtag

                    //return '<a href="' + data + '" target="_blank">Read the full text</a>' + "<span class='bugspan'> <a href ='https://github.com/OpenITI/Annotation/issues/new?assignees=&labels=text+quality&template=text-quality-issue-.md&title=" + fullbookuri + "' target=_blank title='Full Text Issue - raise issue on GitHub'> <i class='fas fa-bug bug'></i></a></span>";
                }




            },

            {
                "data": "author",
                "render": function (data, type, row, meta) {
                    d = data.substring(4);
                    // d = data.substring(0,4);
                    // d = pad(Math.ceil(d / 25) * 25,4)
                    // a = 'https://raw.githubusercontent.com/OpenITI/'+d+'AH'+'/master/data/'+data+'/'+data+'.yml'

                    d = d.replace(/([A-Z])/g, ' $1').trim();
                    //f = "<a href ='" +a+"' target=_blank>"+s+"</a>"
                    return "<div class='author text-wrap'>" + d.split("::")[0] + "<br/>" + d.split("::")[1] + "</div>";

                    //return s = s.replace(/([A-Z])/g, ' $1').trim();

                }
            },



            {
                "data": "date",
                render: function (data) {

                    return "<div class='text-wrap'>" + checknull(data) + "</div>"
                }
            },
            {
                "data": "length",
                render: function (data) {

                    return "<div class='text-wrap'>" + checknull(data) + "</div>"
                }
            },
            // {
            //     "data": "status",
            //     "render": function (data, type, row, meta) {
            //         return data.toUpperCase();
                            
            //     }
            // },

            {
                "data": "Edition",
                "render": function (data, type, row, meta) {
                    data = checknull(data)
                    
                    data = data.replace(/::|:: ::/g, " ");

                    return data

                    // return "<div class='text-wrap'>" + data + "</div>";


                }


            },

            {
                "data": "Edition:Editor",
                "render": function (data, type, row, meta) {
                    data = checknull(data)
                    //data = data.replace(/::|::::/g, "<br/> ");

                    return data

                    // return "<div class='text-wrap'>" + data + "</div>";


                }

            },

            {
                "data": "tags",
                "render": function (data, type, row, meta) {
                    tags = data.replace(/;_|_|;/g, " ");
                    Atags = checknull(row['classification']);
                    Atags = Atags.replace(/::|_|;/g, " ");

                    return "<div class='tag text-wrap'>" + tags + "<br/>" + Atags + "</div>";


                }


            },



















           
            // {
            //     "data": null,
            //     "render": function (data, type, row, meta) {
            //         //console.log(meta.row);
            //         var new_id = data['url'].split('/')[9].split('.')[2];
            //         //console.log(new_id);

            //         var srtsLinks = {
            //             Oct17: 'http://dev.kitab-project.org/passim1017/' + data['id'],
            //             Feb19: 'http://dev.kitab-project.org/passim01022019/' + new_id,
            //             Aggregated: 'http://dev.kitab-project.org/aggregated01052019/' + new_id
            //         }
            //         if (type === 'rawExport') {
            //             return srtsLinks;
            //         }


            //         srtContainer = '<div> <a href="' + srtsLinks.Oct17 + '" target="_blank"> October 2017 (V1) </a> <br/> <a href="'
            //             + srtsLinks.Feb19 + '" target="_blank">Feburary 2019 (V2) </a> <br/><a href="'
            //             + srtsLinks.Aggregated + '" target="_blank">May 2019 (Aggregated)</a> </div>'

            //         return srtContainer
            //     }


            // }
        ]


    });

   

});

// function format ( d ) {
//     // `d` is the original data object for the row
//     return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
//         '<tr>'+
//             '<td>Full name:</td>'+
//             '<td>'+d.name+'</td>'+
//         '</tr>'+
//         '<tr>'+
//             '<td>Extension number:</td>'+
//             '<td>'+d.extn+'</td>'+
//         '</tr>'+
//         '<tr>'+
//             '<td>Extra info:</td>'+
//             '<td>And any further details here (images etc)...</td>'+
//         '</tr>'+
//     '</table>';
// }

// $('#example tbody').on('click', 'td.details-control', function () {
//     var tr = $(this).closest('tr');
//     var row = table.row( tr );

//     if ( row.child.isShown() ) {
//         // This row is already open - close it
//         row.child.hide();
//         tr.removeClass('shown');
//     }
//     else {
//         // Open this row
//         row.child( format(row.data()) ).show();
//         tr.addClass('shown');
//     }
// } );




