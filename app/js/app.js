(function () {
  'use strict';

  var controller = (function () {
    var ctrl = {};

    ctrl.showNotes = function (notes) {
      var i,
        $noteDiv = $('#notes'),
        template = [
          '<div>',
            '<h3><a href="#{id}">{title}</a><small>{date}</small></h3>',
            '<div>{text}</div>',
          '</div>'
        ].join('\n');

      for (i = 0; i < notes.length; ++i) {
        notes[i].date = new Date(notes[i].date);
        $noteDiv.append($(template.replace('{id}', notes[i]._id).replace('{title}', notes[i].title).replace('{date}', ((notes[i].date.getMonth() + 1) + '/' + notes[i].date.getDate() + '/' + notes[i].date.getFullYear())).replace('{text}', notes[i].text)));
      }
    };

    ctrl.getNote = function (id) {
      var data = id ? {id: id} : {};
      $.ajax({
        type: 'GET',
        url: '/notes',
        data: data,
        success: ctrl.showNotes,
        dataType: 'json'
      });
    };

    ctrl.addNote = function (title, text) {
      $.ajax({
        type: 'POST',
        url: '/notes',
        data: {
          title: title,
          text: text
        },
        success: function () {
          ctrl.getNote();
        },
        dataType: 'json'
      });
    };

    return ctrl;
  }());

  function attachHandlers() {
    $('#newNote').on('submit', function(e) {
      e.preventDefault();
      controller.addNote(this.noteTitle.value.trim(), this.note.value.trim());
    });
  }

  function ready(fn) {
    if (document.readyState !== 'loading'){
      fn();
    }
    else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function init() {
    attachHandlers();
    controller.getNote();
  }

  ready(init);
}());