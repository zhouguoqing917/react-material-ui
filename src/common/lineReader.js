/**
 * LineReader
 * Available options:
 *   chunkSize {Integer} -- how much of the file to read at a time
 */
function LineReader(options) {
  if (!(this instanceof LineReader)) {
    return new LineReader(options);
  }

  let internals = (this._internals = {});
  let self = this;

  internals.reader = new FileReader();

  internals.chunkSize = options && options.chunkSize ? options.chunkSize : 1024;

  internals.events = {};

  internals.canRead = true;

  internals.reader.onload = function() {
    internals.chunk += this.result;

    if (/\r|\n/.test(internals.chunk)) {
      internals.lines = internals.chunk.match(/[^\r\n]+/g);

      if (self._hasMoreData()) {
        internals.chunk =
          internals.chunk[internals.chunk.length - 1] === "\n"
            ? ""
            : internals.lines.pop();
      }

      self._step();
    } else {
      if (self._hasMoreData()) {
        return self.read();
      }

      if (internals.chunk.length) {
        return self._emit("line", [
          internals.chunk,
          self._emit.bind(self, "end")
        ]);
      }

      self._emit("end");
    }
  };

  internals.reader.onerror = function() {
    self._emit("error", [this.error]);
  };
}

/**
 * LineReader#on
 *
 * Binds events
 *
 * @param {String} eventName -- the name of the event to bind to
 * @param {Function} cb -- the function to execute when the event is triggered
 */
LineReader.prototype.on = function(eventName, cb) {
  this._internals.events[eventName] = cb;
};

/**
 * LineReader#read
 *
 * Starts the read process
 *
 * @param {File} file -- The file reference to process
 */
LineReader.prototype.read = function(file) {
  let internals = this._internals;

  /**
   * If 'file' is defined, then we want to get some information about it and
   * reset 'readPos', 'chunk', and 'lines'
   */
  if (typeof file !== "undefined") {
    internals.file = file;
    internals.fileLength = file.size;
    internals.readPos = 0;
    internals.chunk = "";
    internals.lines = [];
  }

  /**
   * Extract a section of the file for reading starting at 'readPos' and
   * ending at 'readPos + chunkSize'
   */
  let blob = internals.file.slice(
    internals.readPos,
    internals.readPos + internals.chunkSize
  );

  internals.readPos += internals.chunkSize;

  internals.reader.readAsBinaryString(blob);
};

LineReader.prototype.abort = function() {
  this._internals.canRead = false;
};

LineReader.prototype._step = function() {
  let internals = this._internals;

  if (internals.lines.length === 0) {
    if (this._hasMoreData()) {
      return this.read();
    }
    return this._emit("end");
  }

  if (internals.canRead) {
    this._emit("line", [
      decodeURIComponent(escape(internals.lines.shift())),
      this._step.bind(this)
    ]);
  } else {
    this._emit("end");
  }
};

LineReader.prototype._hasMoreData = function() {
  const internals = this._internals;
  return internals.readPos <= internals.fileLength;
};
LineReader.prototype._emit = function(event, args) {
  const boundEvents = this._internals.events;
  if (typeof boundEvents[event] === "function") {
    boundEvents[event].apply(this, args);
  }
};

export { LineReader };
