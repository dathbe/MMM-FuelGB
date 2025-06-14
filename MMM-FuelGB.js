Module.register('MMM-SunMap', {
  // Default module config.
  defaults: {
    updateInterval: 15, // minutes
    // fadeSpeed: 500,
    height: 450,
  },

  // Define required styles.
  getStyles: function () {
    return ['MMM-SunMap.css']
  },

  // Start the module.
  start: function () {
    Log.info('Starting module: ' + this.name)
  },

  firstLoad: function () {
    // Schedule the UI load based on normal interval
    var self = this
    setInterval(function () {
      self.updateDom()
    }, this.config.updateInterval * 60 * 1000)
  },

  notificationReceived: function (notification) {
    if (notification === 'DOM_OBJECTS_CREATED') {
      this.firstLoad()
    }
  },

  getDom() {
    const wrapper = document.createElement('div')
    wrapper.className = 'SunMapDiv'
    var SunMapImage = new Image()
    SunMapImage.height = this.config.height
    var currTime = new Date()
    SunMapImage.src = `https://www.timeanddate.com/scripts/sunmap.php?iso=${currTime.getFullYear()}${currTime.getMonth()}${currTime.getDate()}T${currTime.getHours()}${currTime.getMinutes()}&earth=1`
    wrapper.appendChild(SunMapImage)

    const textBox = document.createElement('div')
    textBox.className = 'date-time'
    textBox.innerHTML = currTime.toLocaleString()
    wrapper.appendChild(textBox)

    return wrapper
  },
})
