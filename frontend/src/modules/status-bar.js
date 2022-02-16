function updateStatusBarView(foodLevel, hygieneLevel, funLevel) {
    $("#progressbar").progressbar({
        value: foodLevel
    })
    $('#progressbar-number').html(foodLevel)

    $("#hygienebar").progressbar({
        value: hygieneLevel
    })
    $('#hygienebar-number').html(hygieneLevel)

    $('#funbar').progressbar({
        value: funLevel
    })
    $('#fun-number').html(funLevel)
}

export {updateStatusBarView};