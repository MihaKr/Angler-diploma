function dateConvert(isoDate: Date ): String {
    var d = new Date(isoDate);

    d.toLocaleDateString('en-GB'); // dd/mm/yyyy
    return d.toString()
}

export default dateConvert;
