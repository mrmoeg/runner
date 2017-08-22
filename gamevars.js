var gamevars = {
  height: 600,
  width: 800,
  colors: {
    text:             "#FFFFFF",
    splashBackground: "#BB33BB",
    menuBackground:   "#33BB33",
    gameBackground:   "#BB9933",
  },
  fonts: {
    default: "24px Arial",
  }
};

function rotateVector2(v, angle, useRadians){
  var sin = Math.sin( Math.radians(angle) );
  var cos = Math.cos( Math.radians(angle) );

  if(typeof useRadians !== 'undefined' && useRadians === true){
    sin = Math.sin( angle );
    cos = Math.cos( angle );
  }

  var tx = v.x;
  var ty = v.y;
  v.x = (cos * tx) - (sin * ty);
  v.y = (sin * tx) + (cos * ty);
  return v;
}

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
