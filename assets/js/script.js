$(document).ready(
  //document doesn't need quotation because it's object.
  function() {
    // alert($("p").text()); //needs quotation because it's a tag.

    $('#dismiss, .overlay, #sidebarToggle').on('click', function () { //think of passing the exact css selector in quotation marks. same selectors as css. just quotations.
      console.log('click');
      toggleSidebar();
    });
  }
);

function toggleSidebar() {
  $('#sidebar').toggleClass('active');
  $('#sidebarToggle').toggleClass('active');
  $('.overlay').toggleClass('active'); //selecting elements. with this class.
}
