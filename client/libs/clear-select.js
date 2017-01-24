// Select 2
export const clearSelect2 = function (elements) {
    elements = _.isUndefined(elements) ? [] : (_.isArray(elements) ? elements : [elements]);

    if (_.isEmpty(elements)) {
        $('.select2-container').each(function () {
            $(this).val(null).trigger("change");
        });

        //console.log('clear all select2');
    } else {
        _.forEach(elements, function (element) {
            element.val(null).trigger("change");
        });
    }
};
