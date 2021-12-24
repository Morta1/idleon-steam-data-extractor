class Unserializer {
  stencylString;
  pos;
  scache;
  cache;
  length;
  floatDigits = '0123456789+-.,eE';

  constructor(s) {
    this.pos = 0;
    this.scache = [];
    this.cache = [];
    this.length = s.length;
    this.stencylString = s;
  }

  static decode(string) {
    return new Unserializer(string).unserialize();
  }

  get(position) {
    return this.stencylString?.charAt(position);
  }

  readDigits() {
    let k = 0;
    let s = false;
    const fpos = this.pos;
    while (true) {
      const c = this.get(this.pos);
      if (!c)
        break;
      if (c === "-") {
        if (this.pos !== fpos)
          break;
        s = true;
        this.pos++;
        continue;
      }
      if (c < "0" || c > "9")
        break;
      k = k * 10 + (c - "0");
      this.pos++;
    }
    if (s)
      k *= -1;
    return k;
  }

  readFloat() {
    let resultFloat = '';
    while (true) {
      const c = this.get(this.pos);
      if (!c)
        break;
      // + - . , 0-9
      if (this.floatDigits.includes(c)) {
        resultFloat += c;
        this.pos++;
      } else
        break;
    }
    return resultFloat;
  }

  unserializeObject(o = {}) {
    while (true) {
      if (this.pos >= this.length)
        throw "Invalid object";
      if (this.get(this.pos) === "g")
        break;
      let k = this.unserialize();
      if (!(typeof k === 'string'))
        throw "Invalid object key";
      o[k] = this.unserialize();
    }
    this.pos++;
  }

  unserialize() {
    switch (this.get(this.pos++)) {
      case "n":
        return null;
      case "t":
        return true;
      case "f":
        return false;
      case "z":
        return 0;
      case "i":
        return this.readDigits();
      case "d":
        return this.readFloat();
      case "y":
        const len = this.readDigits();
        if (this.get(this.pos++) !== ":" || this.length - this.pos < len)
          throw "Invalid string length";
        let s = this.stencylString.substr(this.pos, len);
        this.pos += len;
        s = decodeURIComponent(s);
        this.scache.push(s);
        return s;
      case "k":
        return NaN;
      case "m":
        return -Infinity;
      case "p":
        return Infinity;
      case "a":
        let a = [];
        this.cache.push(a);
        while (true) {
          const c = this.get(this.pos);
          if (c === "h") {
            this.pos++;
            break;
          }
          if (c === "u") {
            this.pos++;
            let n = this.readDigits();
            a[a.length + n - 1] = null;
          } else
            a.push(this.unserialize());
        }
        return a;
      case "o":
        let o = {};
        this.cache.push(o);
        this.unserializeObject(o);
        return o;
      case "r": {
        let n = this.readDigits();
        if (n < 0 || n >= this.cache.length)
          throw "Invalid reference";
        return this.cache[n];
      }
      case "R": {
        let n = this.readDigits();
        if (n < 0 || n >= this.scache.length)
          throw "Invalid string reference";
        return this.scache[n];
      }
      case "x":
        throw this.unserialize();
      case "l":
        let l = [];
        this.cache.push(l);
        while (this.get(this.pos) !== "h")
          l.add(this.unserialize());
        this.pos++;
        return l;
      case "b":
        let h = {};
        this.cache.push(h);
        while (this.get(this.pos) !== "h") {
          let s = this.unserialize();
          h[s] = this.unserialize();
        }
        this.pos++;
        return h;
      case "q": {
        let h = {};
        this.cache.push(h);
        let c = this.get(this.pos++);
        while (c === ":") {
          let i = this.readDigits();
          h[i] = this.unserialize();
          c = this.get(this.pos++);
        }
        if (c !== "h")
          throw "Invalid IntMap format";
        return h;
      }
      case "M": {
        let h = {};
        this.cache.push(h);
        while (this.get(this.pos) !== "h") {
          let s = this.unserialize();
          h[s] = this.unserialize();
        }
        this.pos++;
      }
      default:
    }
    --this.pos;
    console.error("Invalid char " + this.get(this.pos) + " at position " + this.pos);
  }
}

module.exports = Unserializer;
