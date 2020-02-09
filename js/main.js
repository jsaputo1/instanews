console.log ("working")

$(function() {

    $('.drop-drown').on("change", function() {
        console.log ("test")


let userInput= $("select").val()


console.log (userInput)

        $.ajax({
            dataType: "json",
            method: 'GET',
            url: `https://api.nytimes.com/svc/topstories/v2/${userInput}.json?api-key=qZeF0WlVIE49aaMuTGpSM5bAxYeDLSyT`            
        })

        .done(function ({results}){

            $.each(results, function(index, value) {
                if (index === 12) return false;
                console.log(index, value)
                console.log(index, value.abstract)
                console.log(index, value.url)
                console.log(index, value.multimedia[3].url)

                $('.article-image').append(`<img src="${value.multimedia[0].url}"> <p class="article-text">${value.abstract}<p>`);

          
             })
            })


        // .done(function (data){
        //     $.each(data.results, function(index,value){
        //     console.log(`${index}: ${value.title}`)
        //      })
        //     })

        // .fail(function() {
        // $(".user-name").append("Sorry there was an error")
        //     })

        // .always(function() {
        //     $(".user-name").append("<p>Thanks for using our API</p>")
        // })

    }) // close button function
}) // close 