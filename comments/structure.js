// state structure

const state = {
    data: [
        {
            fields_of_subject: 'fields of subject - required only one field with name "id". Another names of fields is up to you',
            // didInvalidate: 'boolean - if data of this row is not valid',
            // isLoading: 'boolean - if the row data was requested but have not been received yet',
            // isSelected: 'boolean - if row is selected on front',
            // isEditing: 'boolean - if the row in edit mode'
        }
    ],
    filter: {
        // if array of values get empty all accessor should be removed from filter
        accessor_name: {
            condition: 'one of possible conditions like: > < = != empty etc',
            values: ['value 1', 'value N']
        }
    },
    didInvalidate: 'boolean - if table data is not valid and shout be reloaded',
    isLoading: 'boolean - if table data was requested, but have not been received yet'
}

//