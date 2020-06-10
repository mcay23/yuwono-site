$('#navbar').on('show.bs.collapse', function () {
    //document.getElementById("navbar-center-brand").style.display = 'none';
    console.log('none')
    document.getElementById("navbar-center-brand").className = 'd-none';
})

$('#navbar').on('hide.bs.collapse', function () {
    document.getElementById("navbar-center-brand").className = 'navbar-brand d-block d-md-none center';
})

