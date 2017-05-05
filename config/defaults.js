module.exports = {
  clusterData: false,
  winston: {
    levels: {
      error             : 0,
      debug             : 1,
      warn              : 2,
      data              : 3,
      info              : 4,
      verbose           : 5,
      silly             : 6
    },
    colors: {
      error             : "red",
      debug             : "blue",
      warn              : "yellow",
      data              : "grey",
      info              : "green",
      verbose           : "cyan",
      silly             : "magenta"
    },
    logLevel          : "silly"
  }
};