$(() => {
  $('#limitsInput').on('input', function() {
    if ($(this).val().match(/^[a-zA-Z0-9 _\-\.+\[\]\{\}\(\)]{0,32}$/) === null) {
      $('#limits').show();
      $("#submit").prop('disabled', true);
    } else {
      $('#limits').hide();
      $("#submit").prop('disabled', false);
    }
  });
});



