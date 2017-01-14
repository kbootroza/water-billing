export const areaSchema = new SimpleSchema({
    area: {
        type: String,
        autoform: {
            type: 'select',
            options() {
                return [{
                    label: 'Battambang',
                    value: '02'
                }]
            }
        }
    }
})