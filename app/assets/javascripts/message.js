$(function () {
  function buildHTML(message) {
    var content = message.content ? `${message.content}` : "";
    var img = message.image ? `<img class="lower-info__image" src="${message.image}">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-info">
                    <p class="upper-info__user">
                      ${message.user_name}
                    </p>
                    <p class="upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                    <div class="lower-info">
                      <p class="lower-info__content">
                          ${content}
                      </p>
                          ${img}
                    </div>
                </div>`
    return html;
  }
  $('#form').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
        $('form')[0].reset();
      })
      .fail(function () {
        alert('error');
      });
    return false;
  });
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {

      var last_message_id = $('.message:last').data('message-id');

      $.ajax({
        url: 'api/messages',
        type: 'GET',
        data: { id: last_message_id },
        dataType: 'json'
      })


        .done(function (messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
          });
        })
        .fail(function () {
          alert("自動更新に失敗しました")
        });
    };
  };
  setInterval(reloadMessages, 5000);
});




















// $(function(){
//     function buildHTML(message){
//       var mix = message.image ? `<img src=${message.image} > `: "";
//         var html =
//           `<div class="message" data-message-id=${message.id}>
//             <div class="upper-message">
//               <div class="upper-message__user-name">
//                 ${message.user_name}
//               </div>
//               <div class="upper-message__date">
//                 ${message.date}
//               </div>
//             </div>
//             <div class="lower-message">
//               <p class="lower-message__content">
//                 ${message.content}
//               </p>
//             </div>
//             ${mix}
//           </div>`
//         return html;
//     }
//   $('#form').on('submit', function(e){
//     e.preventDefault();
//     var formData = new FormData(this);
//     var url = $(this).attr('action');
//     $.ajax({
//       url: url,
//       type: "POST",
//       data: formData,
//       dataType: 'json',
//       processData: false,
//       contentType: false
//     })
//     .done(function(data){
//       var html = buildHTML(data);
//       $('.messages').append(html);
//       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
//       $('form')[0].reset();
//     })
//     .fail(function(){
//       alert('error');
//     });
//     return false;
//   });
// });