/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("public/site-measurement.js", "utf8");

function boot({ href = "https://1bite.studio/", referrer = "", stored } = {}) {
  const windowListeners = {};
  const documentListeners = {};
  const ids = {};
  const cookieWrites = [];
  const scripts = [];
  const store = stored ? { "site-consent-v2": JSON.stringify(stored) } : {};

  class Element {
    constructor(tagName) {
      this.tagName = tagName;
      this.listeners = {};
      this.dataset = {};
      this.isConnected = true;
    }
    addEventListener(type, listener) {
      (this.listeners[type] ||= []).push(listener);
    }
    appendChild(child) {
      if (this === document.head && child.tagName === "script") scripts.push(child);
      return child;
    }
    querySelector(selector) {
      if (selector === "#measurement-dialog") return ids["measurement-dialog"];
      if (selector === "[name=analytics]") return ids.analytics;
      if (selector === "[name=advertising]") return ids.advertising;
      return null;
    }
    closest() {
      return this;
    }
  }
  const dialog = new Element("dialog");
  dialog.open = false;
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; };
  const banner = new Element("section");
  const analytics = new Element("input");
  const advertising = new Element("input");
  ids["measurement-dialog"] = dialog;
  ids["measurement-banner"] = banner;
  ids.analytics = analytics;
  ids.advertising = advertising;
  const document = {
    readyState: "complete",
    referrer,
    head: new Element("head"),
    body: new Element("body"),
    activeElement: new Element("button"),
    createElement(tagName) {
      return new Element(tagName);
    },
    getElementById(id) {
      return ids[id] || null;
    },
    addEventListener(type, listener) {
      (documentListeners[type] ||= []).push(listener);
    },
  };
  Object.defineProperty(document, "cookie", {
    get: () => "_fbp=test; _fbc=test",
    set: (value) => cookieWrites.push(value),
  });
  document.body.appendChild = (root) => {
    ids.root = root;
    // The production markup creates these elements before the root is appended.
    return root;
  };
  const window = {
    document,
    location: {
      href,
      get pathname() { return new URL(this.href).pathname; },
      get hostname() { return new URL(this.href).hostname; },
      reload() { window.reloaded = true; },
    },
    localStorage: {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = value; },
    },
    addEventListener(type, listener) {
      (windowListeners[type] ||= []).push(listener);
    },
    dispatchEvent(event) {
      (windowListeners[event.type] || []).forEach((listener) => listener(event));
    },
    CustomEvent: class CustomEvent {
      constructor(type, init) { this.type = type; this.detail = init && init.detail; }
    },
  };
  const context = {
    window,
    document,
    location: window.location,
    localStorage: window.localStorage,
    URL,
    Element,
    Event: class Event { constructor(type) { this.type = type; } },
    CustomEvent: window.CustomEvent,
    Date,
    JSON,
  };
  vm.runInNewContext(source.replace(
    /^window\.siteMeasurementConfig = .*;$/m,
    'window.siteMeasurementConfig = { name: "1bite", metaPixelId: "123456789" };'
  ), context);
  function click(action) {
    const target = new Element("button");
    target.dataset.choice = action;
    (ids.root.listeners.click || []).forEach((listener) => listener({ target }));
  }
  return { window, ids, scripts, cookieWrites, click };
}

function queued(window, command) {
  return (window.fbq && window.fbq.queue || []).filter((args) => args[0] === command);
}

{
  const app = boot();
  app.click("reject");
  assert.equal(app.scripts.length, 0, "denied advertising must not load Meta");
  assert.equal(app.window.fbq, undefined, "denied advertising must not initialize Meta");
}

{
  const app = boot();
  app.click("accept");
  assert.deepEqual(
    app.scripts.map((script) => script.src),
    ["https://connect.facebook.net/en_US/fbevents.js"],
    "advertising consent loads Meta once"
  );
  assert.equal(app.window._fbq, app.window.fbq, "official _fbq alias points to the Meta bootstrap");
  assert.equal(app.window.fbq.push, app.window.fbq, "official Meta bootstrap exposes push as fbq");
  const autoConfig = queued(app.window, "set")[0];
  assert.deepEqual(Array.from(autoConfig).slice(0, 3), ["set", "autoConfig", false]);
  assert.equal(autoConfig[3], "123456789");
  const init = queued(app.window, "init")[0];
  assert.equal(init[1], "123456789");
  assert.equal(queued(app.window, "trackSingle").length, 1, "initial consent sends one PageView");
  app.window.dispatchEvent({ type: "site-page-view" });
  assert.equal(queued(app.window, "trackSingle").length, 1, "same pathname does not duplicate PageView");
  app.window.location.href = "https://1bite.studio/servicios";
  app.window.dispatchEvent({ type: "site-page-view" });
  assert.equal(queued(app.window, "trackSingle").length, 2, "SPA pathname sends one PageView");
  app.ids.advertising.checked = false;
  app.click("save");
  assert.equal(queued(app.window, "consent").some((args) => args[1] === "revoke"), true, "withdrawal revokes Meta");
  assert.equal(app.cookieWrites.some((value) => value.startsWith("_fbp=")), true, "withdrawal clears _fbp");
  assert.equal(app.cookieWrites.some((value) => value.startsWith("_fbc=")), true, "withdrawal clears _fbc");
}

{
  const app = boot({ href: "https://1bite.studio/?email=person@example.com" });
  app.click("accept");
  assert.equal(app.scripts.length, 0, "non-marketing query prevents Meta load");
}

{
  const app = boot({ href: "https://1bite.studio/?constructor=value" });
  app.click("accept");
  assert.equal(app.scripts.length, 0, "inherited property names do not pass the URL allowlist");
}

{
  const app = boot({ referrer: "https://example.com/?token=secret" });
  app.click("accept");
  assert.equal(app.scripts.length, 0, "unsafe referrer prevents Meta load");
}

console.log("site-measurement Meta consent tests passed");
