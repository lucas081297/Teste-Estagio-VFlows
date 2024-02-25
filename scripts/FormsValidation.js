
export function formValidation (){

    // // Razao Social
    // let reg = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
    // let elementValue = $('[name="razaoSocial"]').val().trim()
    // if(!reg.test(elementValue)){
    //     return alert('Razão Social inválida')
    // }

    // //CNPJ
    // reg = /^[0-9]*$/
    // elementValue = $('[name="cnpj"]').val().trim()
    // if(!reg.test(elementValue)){
    //     return alert('CNPJ deve conter apenas números')
    // }
    // if(elementValue.length !== 14){
    //     return alert('CNPJ deve conter 14 números')
    // }

    // //Inscricao Estadual
    // reg = /^[0-9]*$/
    // elementValue = $('[name="inscricaoEstadual"]').val().trim()
    // if(!reg.test(elementValue)){
    //     return alert('Inscricao Estadual so pode ter números')
    // }

    // //CEP
    // reg = /^[0-9]*$/
    // elementValue = $('[name="cep"]').val().trim()
    // if(!reg.test(elementValue)){
    //     return alert('CEP so pode ter números')
    // }
    // if(elementValue.length !== 8){
    //     return alert('CEP deve ter 8 dígitos')
    // }

    // //Inscricao Municipal

    // reg = /^[0-9]*$/
    // elementValue = $('[name="inscricaoMunicipal"]').val().trim()
    // if(!reg.test(elementValue)){
    //     return alert('Inscricao Municipal so pode ter números')
    // }

    // //Nome contato
    // reg = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
    // elementValue = $('[name="nomeContato"]').val().trim()
    // if(!reg.test(elementValue)){
    //     return alert('Nome inválido')
    // }

    // //Telefone contato

    // reg = /^[0-9]*$/
    // elementValue = $('[name="telefoneContato"]').val().trim()
    // if(!reg.test(elementValue)){
    //     return alert('Numero inválido')
    // }

    // //File Validation
    // if ($('.file').length < 2) {
    //     return alert('É obrigatório no mínimo 1 anexo')
    // }

    //Process Form
    $('form').addClass('loading')
    $('.loading-container').removeClass('d-none')
    let dataFormArray = $('#dados input').serializeArray()
    let dataFormObject = dataFormArray.reduce(
        (obj, item) => Object.assign(obj, { [item.name]: item.value }),{}
    )
    dataFormObject = Object.assign({},dataFormObject,{"produtos": {},"anexos": {}})
    let productsArray = []
    $('.product').each(function(){
        let id = $(this).attr('id').split('-')[1]                
        productsArray.push([
            `"indice": ${$(this).attr('id').split('-')[1]}`,
            `"descricaoProduto": ${$('[name="descricaoProduto"]').val()}`,
            `"unidadeMedida" : ${$(`[name="unidadeMedida"]`).val()}`,
            `"qtdeEstoque" : ${$(`[name="qtdeEstoque-${id}"]`).val()}`,
            `"valorUnitario" : ${$(`[name="valorUnitario-${id}"]`).val()}`,
            `"valorTotal" : ${$(`[name="valorTotal-${id}"]`).val()}`,

        ])
    })
    const products = { ...productsArray}
    dataFormObject['produtos'] = Object.assign(dataFormObject['produtos'],products)
    let filesArray = []
    $('.file').each(function(){
        let id = $(this).attr('id').split('-')[1]                
        filesArray.push([
            `"indice": ${$(this).attr('id').split('-')[1]}`,
            `"nomeArquivo": ${$(this).find('.file-name').text()}`,
            `"blob" : ${localStorage.getItem('file-'+id)}`,
        ])
    })
    filesArray.shift()
    $('input,select,button,label').prop('disabled',true)
    const files = {...filesArray}
    dataFormObject['anexos'] = Object.assign(dataFormObject['anexos'],files)
    $('input,select,button,label').prop('disabled',false)
    $('.loading-container').addClass('d-none')
    $('form').removeClass('loading')
    $('#main').removeClass('was-validated').trigger('reset')
    $('#modal').trigger('click')
    return console.log(dataFormObject)
}

