//Clear localStorage on load page - Limpar LocalStorage no carregamento da página
$(window).on('load', () => {
    localStorage.clear()
})

//Delete files - Deletar arquivos
$('.button-delete-file').on('click', function () {
    if ($('.file').length <= 2) {
        console.log($('.file').length)
        return alert('É obrigatório no mínimo 1 anexo')
    }
    let fileId = $(this).attr('id')
    $('.files')
        .children('#' + fileId)
        .remove()
    localStorage.removeItem(`${fileId}`)
})

//Add file - Adicionar arquivos
$('input[type="file"]').on('change', (event) => {
    let fileList = event.target.files
    let oldStoreLength = localStorage.length
    var count = 0

    Array.from(fileList).forEach((file) => {
        var fileName = file['name']
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            localStorage.setItem(
                `file-${oldStoreLength + count}`,
                reader.result
            )
            $('#file-generic')
                .clone(true)
                .appendTo('.files')
                .removeClass('d-none')
                .attr('id', `file-${oldStoreLength + count}`)
            //$('#file-generic').remove()
            $(`#file-${oldStoreLength + count}`)
                .find('.file-name')
                .text(fileName)
            $(`#file-${oldStoreLength + count}`)
                .find('.button-delete-file')
                .attr('id', `file-${oldStoreLength + count}`)
            $(`#file-${oldStoreLength + count}`)
                .find('.button-open-file')
                .attr('id', `file-${oldStoreLength + count}`)
            count++
        })

        if (file) {
            reader.readAsDataURL(file)
        }
    })
})

//Open file - Abrir arquivo
$('.button-open-file').on('click', function () {
    let fileId = $(this).attr('id')
    const reader = new FileReader()
    fetch(localStorage.getItem(fileId))
        .then((res) => {
            return res.blob()
        })
        .then((blob) => {
            let a = $("<a style='display: none;'/>")
            let url = URL.createObjectURL(blob)
            a.attr('href', url)
            a.attr('download', 'file')
            $('body').append(a)
            a[0].click()
            window.URL.revokeObjectURL(url)
            a.remove()
        })
})
