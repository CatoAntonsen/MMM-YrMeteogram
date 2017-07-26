/* global Module */

/* Magic Mirror
 * Module: MMM-Yr Meteogram
 *
 * By Cato Antonsen
 * MIT Licensed.
 */

Module.register("MMM-YrMeteogram",{

	// Default module config.
	defaults: {
		debug: false,
		url: "http://www.yr.no/sted/Norge/postnummer/{zip}/meteogram.png",
		zip: 1270,
		refreshInterval: 60000
	},

	debug: function(msg) {
		if (this.config.debug) {
			console.log("MMM-YrMeteogram: " + msg)
		}
	},

	start: function() {
		this.startRefresh(this);
	},

	resume: function() {
		this.startRefresh(this);
	},

	suspend: function() {
		if (this.refreshTimer) window.clearInterval(this.refreshTimer);
	},
	
	// Override dom generator.
	getDom: function() {
		if (!this.hidden) {
			var img = document.createElement("img");
			img.setAttribute("class", "yrMeteogram"); 
			img.id = this.config.id;
			img.src = this.config.url.replace("{zip}", this.config.zip);
			return img;
		}
		
		return document.createElement("div");
	},

	startRefresh: function() {
		var self = this;

		if (self.config.refreshInterval > 0) {
			self.debug("Starting")
			if (self.refreshTimer) window.clearInterval(self.refreshTimer);

			self.refreshTimer = setInterval(function() {
				self.refresh(self);
			}, this.config.refreshInterval);
		}
	},

	refresh: function(self) {
		if (!self.hidden) {
			var images = document.getElementsByClassName("yrMeteogram");
			for (var i=0; i < images.length; i++) {
				var img = images[i];
				if (img.id == self.config.id) {
					img.src = img.src;
					self.debug("Reloading " + url);
				}
			}
		}
	}
});
