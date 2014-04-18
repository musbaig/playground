var chart = {};

var memofibo = function(n) {
  if(chart[n]) {
    return chart[n];
  } else {
    if(n <= 2) {
      return 1;
    } else {
      chart[n] = memofibo(n-1) + memofibo(n-2);
      return chart[n];
    }
  }
};

console.log(memofibo(24));
