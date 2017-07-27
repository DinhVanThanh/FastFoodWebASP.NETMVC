function LoadFeedbackGrid() {
    $('#grid').w2grid({
        name: 'FeedbackGrid',
        recid: 'MaPhanHoi',
        show: {
            toolbar: true,
            footer: true
        },
        multiSearch: false,
        searches: [
            { field: 'MaPhanHoi', caption: 'Feedback Code', type: 'text' },
            { field: 'NoiDung', caption: 'Content', type: 'text' },
            { field: 'ChiNhanh', caption: 'Branch', type: 'text' },
            { field: 'NguoiGui', caption: 'Sender', type: 'text' },
            { field: 'Email', caption: 'Email', type: 'date' }
        ],
        columns: [
            { field: 'MaPhanHoi', caption: 'Feedback Code', size: '10%', sortable: true, attr: 'align=center' },
            { field: 'NoiDung', caption: 'Content', size: '30%', sortable: true, attr: 'align=center' },
            { field: 'ChiNhanh', caption: 'Branch', size: '20%', sortable: true, attr: 'align=center' },
            { field: 'NguoiGui', caption: 'Sender', size: '20%', sortable: true, attr: 'align=center' },
            { field: 'Email', caption: 'Email', size: '20%', sortable: true, attr: 'align=center' }
        ]
    });
}