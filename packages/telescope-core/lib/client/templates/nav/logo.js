Template.logo.helpers({
  logoUrl: function(){
    return Settings.get('logoUrl', '/img/logo.png');
  }
});

Template.logo.onRendered(function  () {
  $(".side-nav .logo-text").quickfit({
    min: 16,
    max: 40,
    truncate: false
  });
});