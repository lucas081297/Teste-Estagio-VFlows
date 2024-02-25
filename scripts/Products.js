//Add one product - Adicionar um produto
$('#button-add-product').on('click', function () {
    $('#product-0')
        .clone(true)
        .appendTo('.products')
        .find('.qtdeEstoque,.valorUnitario,.valorTotal')
        .val('')
    $('.product').each(function () {
        updateProducts()
    })
})

//Update (name and selectors) for all products - Atualizar (nome e seletores) de todos os produtos
function updateProducts() {
    $('.product').each(function (index) {
        $(this)
            .find('.product-name')
            .text(`Produto-${index + 1}`)
        $(this).attr('id', `product-${index}`)
        $(this).find('.button-delete-product').attr('id', `product-${index}`)
        $(this).find('.select-button').attr('id', `product-${index}`)
        $(this).find('.select-units').attr('id', `product-${index}`)
        $(this)
            .find('.qtdeEstoque')
            .attr({ id: `product-${index}`, name: `qtdeEstoque-${index}` })
        $(this)
            .find('.valorUnitario')
            .attr({ id: `product-${index}`, name: `valorUnitario-${index}` })
        $(this)
            .find('.valorTotal')
            .attr({ id: `product-${index}`, name: `valorTotal-${index}` })
    })
}

//Delete one product - Deletar um produto
$('.button-delete-product').on('click', function () {
    if ($('.products').children().length <= 1) {
        return alert('É obrigatório no mínimo 1 produto')
    }
    let productId = $(this).attr('id')
    $('.products')
        .children('#' + productId)
        .remove()
    updateProducts()
})
