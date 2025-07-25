/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { test } from 'node:test';
import { strict as assert } from 'assert';
import { TestRig } from './test-helper.js';

test('should be able to search the web', async (t) => {
  const rig = new TestRig();
  rig.setup(t.name);

  await rig.run(`what is the weather in London`);

  // Give the collector time to write to the log file.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const toolLogs = rig.readToolLogs();
  const searchToolCalls = toolLogs.filter(
    (log) => log.toolRequest.name === 'google_web_search',
  );
  assert.ok(searchToolCalls.length > 0, 'Expected at least one call to google_web_search');
});
