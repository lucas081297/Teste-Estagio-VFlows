$(function() {
    $("#select-button").on('click', function() {
        var $target = $("#units");
        var $clone = $target.clone().removeAttr('id');
        $clone.val($target.val()).css({
            overflow: "auto",
            position: 'absolute',
            'z-index': 999,
            left: $target.offset().left,
            top: $target.offset().top + $target.outerHeight(),
            width: $target.outerWidth()
        }).attr('size', $clone.find('option').length > 10 ? 10 : $clone.find('option').length).change(function() {
            $target.val($clone.val());
        }).on('click blur keypress',function(e) {
         if(e.type !== "keypress" || e.which === 13)
            $(this).remove();
        });
        $('body').append($clone);
        $clone.focus();
    });
});
