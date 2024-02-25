import {formValidation} from './FormsValidation.js'

//Client-side validation (Bootstrap pattern) - Validação client-side (padrão Bootstrap)
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        else{
            event.preventDefault()
            return formValidation()
        }
        
        form.classList.add('was-validated')
      }, false)
    })
  })()

//Prevent event enter key for submit forms
$(document).ready(function() {
    $(window).bind("keypress", function(e) {
        if ((e.keyCode == 10)||(e.keyCode == 13)) {
            e.preventDefault();
        }
    });
});  

//Fetch cep via API - Obter CEP via API
$('[name="cep"]').on('change', function () {
    let cep = $(this).val()
    if (cep !== '' && cep.length == 8) {
        $('form').addClass('loading')
        $('.loading-container').removeClass('d-none')
        $('input,button,select').prop('disabled',true)
        $.ajax({
            url: 'https://viacep.com.br/ws/' + cep + '/json/',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.erro !== undefined) {
                    alert('CEP inválido ou não encontrado')
                } else {
                    $('[name="endereco"]').val(data.logradouro)
                    $('[name="complemento"]').val(data.complemento)
                    $('[name="bairro"]').val(data.bairro)
                    $('[name="municipio"]').val(data.localidade)
                    $('[name="estado"]').val(data.uf)
                }
            },
            error: function (data) {
                alert('Algum erro ocorreu, consulte o log.')
            },
            complete: function () {
                $('form').removeClass('loading')
                $('.loading-container').addClass('d-none')
                $('input,button,select').prop('disabled',false)
            },
        })
    } else {
        $('[name="endereco"]').val('')
        $('[name="complemento"]').val('')
        $('[name="bairro"]').val('')
        $('[name="municipio"]').val('')
        $('[name="estado"]').val('')
    }
})

//Update product total value - Atualizar valor total de um produto
$('.qtdeEstoque, .valorUnitario').on('change', function () {
    let changedElementId = $(this).attr('id').split('-')[1]
    let qttdeEstoque = $(`[name='qtdeEstoque-${changedElementId}']`).val()
    let valorUn = $(`[name='valorUnitario-${changedElementId}']`).val()
    $(`[name='valorTotal-${changedElementId}']`).val(
        Math.round(qttdeEstoque * valorUn * 100) / 100
    )
})
