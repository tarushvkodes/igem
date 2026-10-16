import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const skill = process.env.TASTE_SKILL_ROOT || '/tmp/stem-taste-skill-upstream/skills/taste-skill';
const { Browser } = await import(pathToFileURL(`${skill}/scripts/lib/cdp.mjs`));
const url = process.argv[2] || 'http://127.0.0.1:5187';
const browser = await Browser.launch();
const results = {};
try {
  const reduced = await browser.newPage({ width: 390, height: 844, mobile: true, reducedMotion: true });
  await reduced.goto(url);
  results.reducedMotion = await reduced.eval(`({matches:matchMedia('(prefers-reduced-motion: reduce)').matches, animations:document.getAnimations().length, title:document.querySelector('h1')?.innerText, controls:document.querySelectorAll('[data-interest]').length, overflow:document.documentElement.scrollWidth>innerWidth})`);
  assert.equal(results.reducedMotion.matches, true);
  assert.equal(results.reducedMotion.animations, 0);
  assert.equal(results.reducedMotion.controls, 4);
  assert.equal(results.reducedMotion.overflow, false);
  const plain = await browser.newPage({ width: 390, height: 844, mobile: true });
  await plain.send('Emulation.setScriptExecutionDisabled', { value: true });
  await plain.goto(url);
  await plain.send('Emulation.setScriptExecutionDisabled', { value: false });
  results.noJavaScript = await plain.eval(`({fallback:!!document.querySelector('noscript main'), appHidden:getComputedStyle(document.querySelector('#app')).display==='none', text:document.body.innerText, links:[...document.querySelectorAll('noscript a')].map(a=>a.href)})`);
  assert.equal(results.noJavaScript.fallback, true);
  assert.equal(results.noJavaScript.appHidden, true);
  assert.match(results.noJavaScript.text, /Room 2517/);
  assert.match(results.noJavaScript.text, /Strawberry DNA Bracelets/);
  assert.equal(results.noJavaScript.links.length, 2);
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
