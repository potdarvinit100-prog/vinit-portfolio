const express = require('express');
const router = express.Router();

// Placeholder for a future LLM-powered chat plug-in.
// The frontend ships with its own rule-based assistant and does not depend on this endpoint.
router.post('/', (req, res) => {
  res.status(501).json({
    ok: false,
    message: 'LLM chat not configured — frontend uses its built-in rule-based assistant.',
  });
});

module.exports = router;
