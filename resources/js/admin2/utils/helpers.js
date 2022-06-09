export const getError = (error) => {
    const errorMessage = "API Error, please try again.";

    if (error.name === "Fetch User") {
        return error.message;
    }

    if (!error.response) {
        console.error(`API ${error.config.url} not found`);
        return errorMessage;
    }
    if (process.env.NODE_ENV === "development") {
    }
    if (error.response.data && error.response.data.errors) {
        return error.response.data.errors;
    }

    return errorMessage;
};


export const getDaysBetweenDates = (dateStart, dateEnd, weekDays) => {
};


export function str_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
};
