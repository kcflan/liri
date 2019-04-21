$(document).ready(function() {
  $('#fullpage').fullpage({
    sectionsColor: ['#333232', '#4BBFC3', '#333232', '#7BAABE','#4BBFC3', '#333232'],
    anchors: [
      'firstSection',
      'secondSection',
      'thirdSection',
      'fourthSection',
      'fifthSection',
      'lastSection'
    ],
    menu: '#menu',
    navigation: true,
    navigationPosition: 'right',

    afterLoad: function(origin, destination, direction) {
      
      //section 1
      if (destination.index == 0) {
        $('#menu').hide();
      }
      //back to original state
      else if (origin && origin.index == 0) {
        $('#menu').show();
      }

      //   $('#moveSectionDown').click(function(e){
      //     e.preventDefault();
      //     $.fn.fullpage.moveSectionDown();
      // });
    }
  });
 
});
